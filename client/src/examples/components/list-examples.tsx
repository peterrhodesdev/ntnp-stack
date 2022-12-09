import { useRouter } from "next/router";
import GetManyExampleDto from "../dtos/get-many-example.dto";

type Props = {
  data: GetManyExampleDto[];
};

export default function ListExamples(props: Props) {
  const router = useRouter();

  const handleRowClick = (example: GetManyExampleDto) => {
    router.push(`/examples/${example.id}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((example) => (
          <tr
            key={example.id}
            onClick={() => handleRowClick(example)}
            className="cursor-pointer hover:bg-blue-100"
          >
            <td>{example.id}</td>
            <td>{example.title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
