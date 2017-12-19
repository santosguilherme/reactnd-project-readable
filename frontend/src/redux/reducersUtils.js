export function updateItemInArray(array, itemId, updateItemCallback) {
    return array.map(item => {
        if (item.id !== itemId) {
            // Since we only want to update one item, preserve all others as they are now
            return item;
        }

        // Use the provided callback to create an updated item
        return updateItemCallback(item);
    });
}