type Props = {
  source?: string;
};

export function CodeImage({ source }: Props) {
  return (
    <img
      src={source}
      alt="The step's blocks"
      className="mx-auto w-2/3 px-2 py-5"
    />
  );
}
