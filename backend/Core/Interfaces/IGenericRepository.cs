using Core.Entities;

namespace Core.Interfaces;

public interface IGenericRepository<T>
{
    Task<T?> GetByIdAsync(int id);
    Task<IReadOnlyList<T?>> ListAllAsync();
    Task<T?> GetEntityWithSpec(ISpecification<T> spec);
    Task<IReadOnlyList<T?>> GetListAsyncWithSpec(ISpecification<T> spec);
    
    void Add(T entity);
    void Update(T entity);
    void Remove(T entity);
    Task<bool> SaveAllAsync();
    bool Exists(int id);
    Task<int> CountAsync(ISpecification<T> spec);

}