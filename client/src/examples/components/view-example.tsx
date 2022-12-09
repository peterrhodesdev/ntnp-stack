import GetOneExampleDto from "../dtos/get-one-example.dto";

type Props = {
  data: GetOneExampleDto;
};

export default function ViewExample(props: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>id</td>
          <td>{props.data.id}</td>
        </tr>
        <tr>
          <td>title</td>
          <td>{props.data.title}</td>
        </tr>
        <tr>
          <td>booleanField</td>
          <td>{props.data.booleanField.toString()}</td>
        </tr>
        <tr>
          <td>floatField</td>
          <td>{props.data.floatField}</td>
        </tr>
        <tr>
          <td>integerConstrainedField</td>
          <td>{props.data.integerConstrainedField}</td>
        </tr>
        <tr>
          <td>numericField</td>
          <td>{props.data.numericField}</td>
        </tr>
        <tr>
          <td>textNullableField</td>
          <td>{props.data.textNullableField ?? "null"}</td>
        </tr>
        <tr>
          <td>timestamptzField</td>
          <td>{props.data.timestamptzField.toLocaleString()}</td>
        </tr>
        <tr>
          <td>varcharConstrainedField</td>
          <td>{props.data.varcharConstrainedField}</td>
        </tr>
      </tbody>
    </table>
  );
}
