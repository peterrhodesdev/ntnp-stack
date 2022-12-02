import { useRouter } from "next/router";
import validator from "validator";
//import isUUID from "validator/es/lib/isUUID"; // requires tree-shakeable ES imports

export default function Example() {
  const router = useRouter();
  const { id } = router.query;

  if (id === undefined || Array.isArray(id) || !validator.isUUID(id)) {
    return <p>invalid id</p>;
  }

  return <h1>Example: {id}</h1>;
}
