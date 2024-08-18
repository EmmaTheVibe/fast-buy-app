import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-gray-951 hover:bg-orange-951 text-gray-952 w-full px-6 py-3 rounded-md"
      aria-disabled={pending}
    >
      {pending ? "Loading..." : "Add"}
    </button>
  );
}

export default SubmitButton;
