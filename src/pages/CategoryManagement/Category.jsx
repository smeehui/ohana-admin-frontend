import { Table } from "react-bootstrap";


const Category = () => {
  return (
    <>
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Tên danh mục</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          
        </tr>
        <tr>
          <td>3</td>
          <td>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
    </>
  );
}

export default Category;