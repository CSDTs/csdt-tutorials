export default function StepCode({ image, isShown }) {
	if (isShown) return <img src={image} alt="" />;
}
