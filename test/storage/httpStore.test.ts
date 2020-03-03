(global as any).fetch = require('node-fetch');

import { HTTPStore } from "../../src/storage/httpStore";
import { openArray } from "../../src/creation";

describe("Test MemoryStore", () => {

    const simpleFixtureStore = new HTTPStore("http://localhost:7357/simple.zarr");
    it("Can open simple fixture", async () => {
        const z = await openArray({ store: simpleFixtureStore});
        expect(z.shape).toEqual([8, 8]);
        expect(await z.get([0, 0])).toEqual(1);
        expect(await z.get([0, 1])).toEqual(2);
        expect(await z.get([7, 7])).toEqual(3);
        expect(await z.get([4, 4])).toEqual(0);
    });

    const emptyFixtureStore = new HTTPStore("http://localhost:7357/empty.zarr");
    it("Can open empty fixture", async () => {
        const z = await openArray({ store: emptyFixtureStore});
        expect(z.shape).toEqual([8, 8]);
        expect(await z.get([0, 0])).toEqual(0);
        expect(await z.get([0, 1])).toEqual(0);
        expect(await z.get([7, 7])).toEqual(0);
        expect(await z.get([4, 4])).toEqual(0);
    });

    const baseUrlStore = new HTTPStore("http://localhost:7357");
    it("Can open by path", async() => {
        const z = await openArray({ store: baseUrlStore, path: "simple.zarr"});
        expect(z.shape).toEqual([8, 8]);
    });
});
