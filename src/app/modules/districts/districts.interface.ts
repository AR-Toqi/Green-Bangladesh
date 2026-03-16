export type IDistrict = {
    id: string;
    name: string;
    area: number;
    estimatedTrees: number;
    treesPerKm2: number;
    divisionId: string;
    score: number;
    zone: 'RED' | 'ORANGE' | 'GREEN';
    createdAt: Date;
    updatedAt: Date;
};
