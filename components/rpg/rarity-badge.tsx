type Rarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary";

type RarityBadgeProps = {
  rarity: Rarity;
};

export function RarityBadge({
  rarity,
}: RarityBadgeProps) {
  return (
    <span
      className={`rarity-badge rarity-${rarity}`}
    >
      {rarity}
    </span>
  );
}