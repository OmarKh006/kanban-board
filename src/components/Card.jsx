/**
 * A card component to display a task.
 * @param {Object} props
 * @param {string} props.title - The title of the card.
 * @returns {JSX.Element} A React component that renders a card with the specified title.
 */

const Card = ({ title }) => {
  return (
    <div className="group/card relative min-h-16 overflow-y-hidden rounded-lg bg-white px-4 py-3 shadow-sm">
      <h2 className="text-heading-m">{title}</h2>
    </div>
  );
};

export default Card;
