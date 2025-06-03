const { runApifyActorAndFetchResults } = require('../../examples/ai_nocode_integrations/apify_sdk_example/run_apify_actor.js');
const { ApifyClient } = require('apify-client'); // Import to be mocked
const fs = require('fs');

// Mock apify-client
jest.mock('apify-client');

// Mock fs.writeFileSync
jest.mock('fs', () => ({
    ...jest.requireActual('fs'), // Import and retain default behavior
    writeFileSync: jest.fn(), // Mock writeFileSync
}));


describe('runApifyActorAndFetchResults', () => {
    let consoleLogSpy;
    let consoleErrorSpy;

    const mockActorId = 'apify/web-scraper';
    const mockRunId = 'mockRunId';
    const mockDatasetId = 'mockDatasetId';
    const mockItems = [
        {
            url: 'http://quotes.toscrape.com/',
            title: 'Quotes to Scrape',
            quotes: [{ text: 'Mock Quote 1', author: 'Author 1' }]
        }
    ];

    const mockActorStartResult = { id: mockRunId, status: 'RUNNING' }; // Or some initial status
    const mockFinishedRunResultSucceeded = { status: 'SUCCEEDED', defaultDatasetId: mockDatasetId };
    const mockFinishedRunResultFailed = { status: 'FAILED', defaultDatasetId: mockDatasetId };
    const mockDatasetListItemsResult = { items: mockItems };
    const mockActorLogResult = "This is a mock actor log.";

    let mockActorStart;
    let mockRunWaitForFinish;
    let mockDatasetListItems;
    let mockLogGet;

    beforeEach(() => {
        process.env.APIFY_TOKEN = 'test_token';

        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        fs.writeFileSync.mockClear();

        // Setup mock implementations for ApifyClient methods
        mockActorStart = jest.fn().mockResolvedValue(mockActorStartResult);
        mockRunWaitForFinish = jest.fn().mockResolvedValue(mockFinishedRunResultSucceeded);
        mockDatasetListItems = jest.fn().mockResolvedValue(mockDatasetListItemsResult);
        mockLogGet = jest.fn().mockResolvedValue(mockActorLogResult);

        ApifyClient.mockImplementation(() => {
            return {
                actor: (actorId) => {
                    expect(actorId).toBe(mockActorId);
                    return {
                        start: mockActorStart,
                    };
                },
                run: (runId) => {
                    expect(runId).toBe(mockRunId);
                    return {
                        waitForFinish: mockRunWaitForFinish,
                    };
                },
                dataset: (datasetId) => {
                    expect(datasetId).toBe(mockDatasetId);
                    return {
                        listItems: mockDatasetListItems,
                    };
                },
                log: (runId) => {
                    expect(runId).toBe(mockRunId);
                    return {
                        get: mockLogGet,
                    };
                }
            };
        });
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
        consoleErrorSpy.mockRestore();
        delete process.env.APIFY_TOKEN;
        jest.clearAllMocks();
    });

    test('should return empty array and log error if APIFY_TOKEN is not set', async () => {
        delete process.env.APIFY_TOKEN;
        const items = await runApifyActorAndFetchResults();
        expect(items).toEqual([]);
        expect(consoleErrorSpy).toHaveBeenCalledWith('APIFY_TOKEN environment variable is not set.');
    });

    test('should successfully run actor and fetch results', async () => {
        const items = await runApifyActorAndFetchResults();

        expect(ApifyClient).toHaveBeenCalledWith({ token: 'test_token' });
        expect(mockActorStart).toHaveBeenCalledTimes(1);
        expect(mockActorStart).toHaveBeenCalledWith(
            expect.objectContaining({
                startUrls: [{ url: "http://quotes.toscrape.com/" }],
                pageFunction: expect.any(String)
            })
        );
        expect(mockRunWaitForFinish).toHaveBeenCalledTimes(1);
        expect(mockDatasetListItems).toHaveBeenCalledTimes(1);

        expect(items).toEqual(mockItems);
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Successfully retrieved 1 items.'));
        expect(consoleLogSpy).toHaveBeenCalledWith(JSON.stringify(mockItems[0], null, 2));
        expect(fs.writeFileSync).toHaveBeenCalledWith('apify_results.json', JSON.stringify(mockItems, null, 2));
    });

    test('should handle actor run failure', async () => {
        mockRunWaitForFinish.mockResolvedValue(mockFinishedRunResultFailed);
        const items = await runApifyActorAndFetchResults();

        expect(items).toEqual([]); // Expect empty items on failure
        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Actor run failed with status: FAILED'));
        expect(mockLogGet).toHaveBeenCalledTimes(1); // Check if log was fetched
        expect(consoleErrorSpy).toHaveBeenCalledWith('\nActor Log:', mockActorLogResult);
    });

    test('should handle no items found after successful run', async () => {
        mockDatasetListItems.mockResolvedValue({ items: [] }); // Simulate no items
        const items = await runApifyActorAndFetchResults();

        expect(items).toEqual([]);
        expect(consoleLogSpy).toHaveBeenCalledWith('Actor run succeeded, but no items were found.');
        expect(fs.writeFileSync).not.toHaveBeenCalled(); // Should not write file if no items
    });

    test('should handle error during actor start', async () => {
        const startError = new Error('Actor start failed');
        mockActorStart.mockRejectedValue(startError);
        const items = await runApifyActorAndFetchResults();

        expect(items).toEqual([]);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error running Apify actor or fetching results:', startError);
    });

    test('should handle error during waitForFinish', async () => {
        const waitForFinishError = new Error('waitForFinish failed');
        mockRunWaitForFinish.mockRejectedValue(waitForFinishError);
        const items = await runApifyActorAndFetchResults();

        expect(items).toEqual([]);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error running Apify actor or fetching results:', waitForFinishError);
    });

    test('should handle error during listItems', async () => {
        const listItemsError = new Error('listItems failed');
        mockDatasetListItems.mockRejectedValue(listItemsError);
        const items = await runApifyActorAndFetchResults();

        expect(items).toEqual([]);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error running Apify actor or fetching results:', listItemsError);
    });
});
