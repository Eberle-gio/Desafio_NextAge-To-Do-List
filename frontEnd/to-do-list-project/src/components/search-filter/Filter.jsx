export const Filter = ({
  filter,
  setFilter,
  sort,
  setSort,
  filterCategory,
  setFilterCategory,
}) => {
  return (
    <div className="filter">
      <h2>Filtrar</h2>
      <div className="filter-options">
        <div>
          <p>Status:</p>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">Todas</option>
            <option value="Completed">Completas</option>
            <option value="Incomplete">Incompletas</option>
          </select>
        </div>
        <div>
          <p>Ordenar por:</p>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Selecionar</option>
            <option value="Asc">A-Z</option>
            <option value="Desc">Z-A</option>
            <option value="createDate">Data de criação</option>
            <option value="expiryDate">Data de vencimento</option>
          </select>
        </div>
        <div>
          <p>Categoria:</p>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">Todas</option>
            <option value="Estudos">Estudos</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Pessoal">Pessoal</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default Filter;
