import Gastos from './Gastos';

const ListadoGastos = ({ gastos }) => {
  return (
    <div className="listado-gastos contenedor">
      <h2>{gastos.length ? 'Gastos' : 'No hay Gastos aún'}</h2>
      {gastos.map((gasto) => (
        <Gastos key={gasto.id} gasto={gasto} />
      ))}
    </div>
  );
};

export default ListadoGastos;
