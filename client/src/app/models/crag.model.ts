export interface Crag {
    id: string;
    name: string;
    type: string;
    country: string;
    sectorIds: string[];
    // ascents: {[key: string]: string};
    ascentIds: string[];
    creatorId: string;
}