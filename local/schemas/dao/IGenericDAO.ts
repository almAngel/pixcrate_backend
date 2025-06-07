// IGenericDAO defines a generic interface for data access objects (DAOs).
// It specifies CRUD operations for any schema type.

/**
 * IGenericDAO<T> interface for generic data access operations.
 * @template T - The schema type for the DAO.
 */
export default interface IGenericDAO<T> {
    /**
     * Loads an entity by its identifier.
     * @param id - The identifier of the entity to load.
     * @returns A promise that resolves to the loaded entity, or null if not found.
     */
    loadById(id: string): Promise<T | null>;

    /**
     * Loads entities that belong to a specific group.
     * @param group - The group criteria to filter entities.
     * @returns A promise that resolves to an array of entities in the group.
     */
    loadGroup(group: Object[]): Promise<T[]>;

    /**
     * Saves a new entity or updates an existing entity.
     * @param params - The parameters for saving or updating the entity.
     * @param params.body - The entity data to save or update.
     * @param params.id - The identifier of the entity to update (optional).
     * @param params.returnResult - Whether to return the saved or updated entity (optional).
     * @returns A promise that resolves to the saved or updated entity.
     */
    saveOrUpdate(params: { body: T; id?: string; returnResult?: boolean }): Promise<any>;

    /**
     * Deletes an entity by its identifier.
     * @param id - The identifier of the entity to delete.
     * @returns A promise that resolves when the entity is deleted.
     */
    delete(id: string): Promise<void>;

    /**
     * Counts the number of entities that match the given criteria.
     * @param body - The criteria to count entities.
     * @returns A promise that resolves to the number of matching entities.
     */
    count(body: Object): Promise<number>;
}
