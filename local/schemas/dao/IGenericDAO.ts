export default interface IGenericDAO {
    load(body: Object): Promise<any>;
    loadById(id: string): Promise<any>;
    loadGroup(group: Object[]): Promise<any>
    saveOrUpdate(body: Object): Promise<any>
    delete(id: string): Promise<any>
    count(body: Object): Promise<any>
}
