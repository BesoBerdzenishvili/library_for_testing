import { CSVLink } from "react-csv";

const BookTable = ({ data }) => {
  return (
    <CSVLink
      data={data}
      filename={"books.csv"}
      className="btn btn-primary"
      target="_blank"
    >
      Download CSV
    </CSVLink>
  );
};

export default BookTable;
