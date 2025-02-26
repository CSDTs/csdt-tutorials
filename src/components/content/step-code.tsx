type Props = {
  image: string;
  isShown: boolean;
};
export default function StepCode({ image, isShown }: Props) {
  if (isShown) return <img src={image} alt="" />;
}
