import GetOneExampleDto from "../dtos/get-one-example.dto";

type Props = {
  data: GetOneExampleDto;
};

export default function ViewExample(props: Props) {
  const tableRows: { property: string; value: string }[] = [
    { property: "Id", value: props.data.id },
    { property: "Title", value: props.data.title },
    { property: "Amount", value: props.data.amount.toString() },
    {
      property: "Date On",
      value: props.data.dateOn.toLocaleString(),
    },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {tableRows.map((row) => (
          <tr key={row.property}>
            <td>{row.property}</td>
            <td>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
