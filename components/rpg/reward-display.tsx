type RewardDisplayProps = {
  xp?: number;
  gold?: number;
  bonus?: string;
};

export function RewardDisplay({
  xp,
  gold,
  bonus,
}: RewardDisplayProps) {
  return (
    <div className="reward-display">
      {xp !== undefined ? (
        <div className="reward-item reward-xp">
          <span className="reward-icon">⚡</span>

          <div>
            <span className="reward-value">
              +{xp.toLocaleString()} XP
            </span>

            <span className="reward-label">
              Experience
            </span>
          </div>
        </div>
      ) : null}

      {gold !== undefined ? (
        <div className="reward-item reward-gold">
          <span className="reward-icon">🪙</span>

          <div>
            <span className="reward-value">
              +{gold.toLocaleString()}
            </span>

            <span className="reward-label">
              Gold
            </span>
          </div>
        </div>
      ) : null}

      {bonus ? (
        <div className="reward-item reward-bonus">
          <span className="reward-icon">✨</span>

          <div>
            <span className="reward-value">
              {bonus}
            </span>

            <span className="reward-label">
              Bonus Reward
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}