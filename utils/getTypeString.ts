export const getTypeString = (type: number): string => {
    switch (type) {
        case 0:
            return 'plastic';
        case 1:
            return 'paper';
        case 2:
            return 'glass';
        case 3:
            return 'cigarettes';
        case 4:
            return 'aluminium';
        default:
            return 'unknown';
    }
};
