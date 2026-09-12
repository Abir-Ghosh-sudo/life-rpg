export const MESSAGES = {
  common: {
    success: "Success.",
    error: "Something went wrong.",
    loading: "Loading...",
    saved: "Changes saved successfully.",
    deleted: "Deleted successfully.",
    updated: "Updated successfully.",
    created: "Created successfully.",
    copied: "Copied to clipboard.",
  },

  auth: {
    loginSuccess: "Welcome back, hero!",
    signupSuccess:
      "Your adventure begins now!",
    logoutSuccess: "Logged out successfully.",

    invalidCredentials:
      "Invalid email or password.",

    emailAlreadyExists:
      "An account with this email already exists.",

    unauthorized:
      "You must be logged in to continue.",

    forbidden:
      "You do not have permission to perform this action.",

    sessionExpired:
      "Your session has expired. Please log in again.",

    passwordResetSent:
      "Password reset instructions have been sent.",

    passwordUpdated:
      "Your password has been updated successfully.",
  },

  validation: {
    invalidInput:
      "Please check your input and try again.",

    required:
      "This field is required.",

    invalidEmail:
      "Please enter a valid email address.",

    invalidPassword:
      "Password must meet the required criteria.",

    passwordMismatch:
      "Passwords do not match.",

    invalidUrl:
      "Please enter a valid URL.",
  },

  character: {
    created:
      "Your character has been created!",
    updated:
      "Character updated successfully.",
    levelUp:
      "Level up! Your power has grown.",
    maxLevel:
      "You have reached the maximum level!",
  },

  quest: {
    created:
      "New quest added to your adventure.",
    updated:
      "Quest updated successfully.",
    deleted:
      "Quest deleted successfully.",
    completed:
      "Quest completed! Rewards unlocked.",
    cancelled:
      "Quest cancelled.",
    alreadyCompleted:
      "This quest has already been completed.",
    notEnoughEnergy:
      "Not enough energy to complete this quest.",
  },

  rewards: {
    xpGained:
      "XP gained!",
    goldGained:
      "Gold earned!",
    rewardsUnlocked:
      "Rewards unlocked!",
  },

  achievement: {
    unlocked:
      "Achievement unlocked!",
    alreadyUnlocked:
      "You have already unlocked this achievement.",
  },

  skill: {
    unlocked:
      "New skill unlocked!",
    locked:
      "This skill is still locked.",
    requirementsNotMet:
      "You have not met the requirements yet.",
  },

  shop: {
    purchased:
      "Item purchased successfully!",
    insufficientGold:
      "You do not have enough gold.",
    alreadyOwned:
      "You already own this item.",
    inventoryFull:
      "Your inventory is full.",
    levelTooLow:
      "Your level is too low for this item.",
  },

  boss: {
    attacked:
      "Attack landed!",
    defeated:
      "Boss defeated! Incredible work!",
    alreadyDefeated:
      "This boss has already been defeated.",
    unavailable:
      "No active boss is available right now.",
  },

  adventure: {
    worldUnlocked:
      "New world unlocked!",
    regionUnlocked:
      "New region discovered!",
    locked:
      "Complete the requirements to unlock this area.",
  },

  focus: {
    started:
      "Focus session started.",
    completed:
      "Focus session completed!",
    cancelled:
      "Focus session cancelled.",
    alreadyActive:
      "You already have an active focus session.",
  },

  theme: {
    unlocked:
      "New theme unlocked!",
    equipped:
      "Theme equipped successfully.",
    locked:
      "This theme is still locked.",
  },

  errors: {
    network:
      "Network error. Please check your connection.",

    notFound:
      "The requested resource could not be found.",

    conflict:
      "This action conflicts with the current state.",

    rateLimited:
      "Too many requests. Please try again later.",

    server:
      "Server error. Please try again later.",

    database:
      "A database error occurred. Please try again.",
  },
} as const;

export type MessageCategory =
  keyof typeof MESSAGES;