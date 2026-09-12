"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  CharacterData,
  QuestItem,
  BossData,
  InventoryItem,
  HistoryEvent,
  FullGameState,
  initialDefaultState,
  getFreshDefaultState,
} from "./default-state";
import { soundEffects } from "@/components/rpg/sound-effects";
import { spawnCombatText } from "@/components/rpg/floating-combat-text";

export type {
  CharacterData,
  QuestItem,
  BossData,
  InventoryItem,
  HistoryEvent,
  FullGameState,
};

interface GameContextType {
  character: CharacterData;
  quests: QuestItem[];
  boss: BossData;
  inventory: {
    equipped: Record<"Weapon" | "Armor" | "Accessory", InventoryItem | null>;
    bag: InventoryItem[];
  };
  history: HistoryEvent[];
  activeQuests: QuestItem[];
  completedQuests: QuestItem[];
  todayFocusCount: number;
  user: { id: string; email: string; name: string } | null;
  notification: string | null;
  isBackendConnected: boolean;
  isHydrated: boolean;
  createQuest: (quest: Omit<QuestItem, "id" | "status">) => void;
  completeQuest: (id: string) => void;
  deleteQuest: (id: string) => void;
  attackBoss: (damage?: number) => { damageDealt: number; defeated: boolean };
  claimBossReward: () => void;
  buyItem: (item: {
    id: string;
    name: string;
    desc: string;
    icon: string;
    price: number;
    type: "Weapon" | "Armor" | "Accessory" | "Consumable";
    stat?: string;
    rarityClass?: string;
  }) => boolean;
  equipItem: (item: InventoryItem) => void;
  unequipItem: (slot: "Weapon" | "Armor" | "Accessory") => void;
  useConsumable: (item: InventoryItem) => void;
  completeFocusSession: (minutes: number) => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  showNotification: (msg: string) => void;
  resetGame: () => Promise<void>;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameStateProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const isResettingRef = useRef<boolean>(false);
  const isLoadedRef = useRef<boolean>(false);

  // Use initialDefaultState initially on BOTH Server & Client to guarantee 100% hydration parity
  const [character, setCharacter] = useState<CharacterData>(() => initialDefaultState.character);
  const [quests, setQuests] = useState<QuestItem[]>(() => initialDefaultState.quests);
  const [boss, setBoss] = useState<BossData>(() => initialDefaultState.boss);
  const [equipped, setEquipped] = useState<Record<"Weapon" | "Armor" | "Accessory", InventoryItem | null>>(() => initialDefaultState.equipped);
  const [bag, setBag] = useState<InventoryItem[]>(() => initialDefaultState.bag);
  const [history, setHistory] = useState<HistoryEvent[]>(() => initialDefaultState.history);
  const [todayFocusCount, setTodayFocusCount] = useState<number>(() => initialDefaultState.todayFocusCount);
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(() => initialDefaultState.user);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((current) => (current === msg ? null : current));
    }, 3500);
  }, []);

  // Hydrate from Backend (authoritative) or localStorage only after mount (client-side)
  useEffect(() => {
    async function initClientState() {
      try {
        let loadedFromBackend = false;
        try {
          const res = await fetch("/api/game/state");
          if (res.ok) {
            const json = await res.json();
            if (json.success && json.data && json.data.character) {
              const backendState: FullGameState = json.data;
              setIsBackendConnected(true);

              setCharacter(backendState.character);
              setQuests(backendState.quests || initialDefaultState.quests);
              setBoss(backendState.boss || initialDefaultState.boss);
              setEquipped(backendState.equipped || initialDefaultState.equipped);
              setBag(backendState.bag || initialDefaultState.bag);
              setHistory(backendState.history || initialDefaultState.history);
              setTodayFocusCount(backendState.todayFocusCount ?? 0);
              if (backendState.user) setUser(backendState.user);

              // Update localStorage cache to match backend
              if (typeof window !== "undefined") {
                localStorage.setItem("liferpg_character", JSON.stringify(backendState.character));
                localStorage.setItem("liferpg_quests", JSON.stringify(backendState.quests));
                localStorage.setItem("liferpg_boss", JSON.stringify(backendState.boss));
                localStorage.setItem("liferpg_equipped", JSON.stringify(backendState.equipped));
                localStorage.setItem("liferpg_bag", JSON.stringify(backendState.bag));
                localStorage.setItem("liferpg_history", JSON.stringify(backendState.history));
              }
              loadedFromBackend = true;
            }
          }
        } catch (backendErr) {
          console.warn("Backend state fetch error, fallback to localStorage:", backendErr);
        }

        // If backend was unreachable, fall back to localStorage
        if (!loadedFromBackend && typeof window !== "undefined") {
          const savedChar = localStorage.getItem("liferpg_character");
          if (savedChar) {
            try { setCharacter(JSON.parse(savedChar)); } catch {}
          }
          const savedQuests = localStorage.getItem("liferpg_quests");
          if (savedQuests) {
            try { setQuests(JSON.parse(savedQuests)); } catch {}
          }
          const savedBoss = localStorage.getItem("liferpg_boss");
          if (savedBoss) {
            try { setBoss(JSON.parse(savedBoss)); } catch {}
          }
          const savedEquipped = localStorage.getItem("liferpg_equipped");
          if (savedEquipped) {
            try { setEquipped(JSON.parse(savedEquipped)); } catch {}
          }
          const savedBag = localStorage.getItem("liferpg_bag");
          if (savedBag) {
            try { setBag(JSON.parse(savedBag)); } catch {}
          }
          const savedHistory = localStorage.getItem("liferpg_history");
          if (savedHistory) {
            try { setHistory(JSON.parse(savedHistory)); } catch {}
          }
          const savedUser = localStorage.getItem("liferpg_user");
          if (savedUser) {
            try { setUser(JSON.parse(savedUser)); } catch {}
          }
        }
      } finally {
        setIsHydrated(true);
        isLoadedRef.current = true;
      }
    }

    initClientState();
  }, []);

  // Save changes to localStorage and Backend (only after initial hydration has finished and not during reset)
  useEffect(() => {
    if (!isLoadedRef.current || isResettingRef.current) return;

    localStorage.setItem("liferpg_character", JSON.stringify(character));
    localStorage.setItem("liferpg_quests", JSON.stringify(quests));
    localStorage.setItem("liferpg_boss", JSON.stringify(boss));
    localStorage.setItem("liferpg_equipped", JSON.stringify(equipped));
    localStorage.setItem("liferpg_bag", JSON.stringify(bag));
    localStorage.setItem("liferpg_history", JSON.stringify(history));
    if (user) {
      localStorage.setItem("liferpg_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("liferpg_user");
    }

    // Debounced sync to backend
    const timeout = setTimeout(() => {
      if (isResettingRef.current) return;
      const payload: FullGameState = {
        character,
        quests,
        boss,
        equipped,
        bag,
        history,
        todayFocusCount,
        user,
      };
      fetch("/api/game/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (res.ok) setIsBackendConnected(true);
        })
        .catch(() => {
          setIsBackendConnected(false);
        });
    }, 600);

    return () => clearTimeout(timeout);
  }, [character, quests, boss, equipped, bag, history, todayFocusCount, user]);

  // Robust Reset Game implementation
  const resetGame = useCallback(async () => {
    try {
      isResettingRef.current = true;

      // 1. Reset backend
      try {
        const res = await fetch("/api/game/reset", { method: "POST" });
        if (res.ok) {
          setIsBackendConnected(true);
        }
      } catch (e) {
        console.warn("Backend reset call warning:", e);
      }

      // 2. Obtain clean fresh Level 1 data clone
      const fresh = getFreshDefaultState();

      // 3. Write directly into localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("liferpg_character", JSON.stringify(fresh.character));
        localStorage.setItem("liferpg_quests", JSON.stringify(fresh.quests));
        localStorage.setItem("liferpg_boss", JSON.stringify(fresh.boss));
        localStorage.setItem("liferpg_equipped", JSON.stringify(fresh.equipped));
        localStorage.setItem("liferpg_bag", JSON.stringify(fresh.bag));
        localStorage.setItem("liferpg_history", JSON.stringify(fresh.history));
        localStorage.setItem("liferpg_user", JSON.stringify(fresh.user));
      }

      // 4. Update React state immediately
      setCharacter(fresh.character);
      setQuests(fresh.quests);
      setBoss(fresh.boss);
      setEquipped(fresh.equipped);
      setBag(fresh.bag);
      setHistory(fresh.history);
      setTodayFocusCount(fresh.todayFocusCount);
      setUser(fresh.user);

      showNotification("🔄 Realm Reset! Your hero has been restored to Level 1.");

      setTimeout(() => {
        isResettingRef.current = false;
        if (typeof window !== "undefined") {
          window.location.href = "/dashboard";
        }
      }, 500);
    } catch (err) {
      console.error("Failed to reset game:", err);
      isResettingRef.current = false;
      showNotification("❌ Error resetting game state.");
    }
  }, [showNotification]);

  // Level up helper
  const addRewards = useCallback((xpGain: number, goldGain: number) => {
    setCharacter((prev) => {
      let newXp = prev.xp + xpGain;
      let newLevel = prev.level;
      let newMaxXp = prev.maxXp;
      let newSkillPoints = prev.skillPoints;

      if (newXp >= newMaxXp) {
        newLevel += 1;
        newXp -= newMaxXp;
        newMaxXp = Math.round(newMaxXp * 1.35);
        newSkillPoints += 1;
        soundEffects.playLevelUp();
        spawnCombatText(`LEVEL UP! LVL ${newLevel}`, "lvl");
        showNotification(`🎉 LEVEL UP! You ascended to Level ${newLevel}! (+1 Skill Point)`);
      } else {
        soundEffects.playQuestComplete();
        spawnCombatText(`+${xpGain} XP`, "xp");
        if (goldGain > 0) {
          setTimeout(() => {
            soundEffects.playGoldClink();
            spawnCombatText(`+${goldGain} GP`, "gold");
          }, 220);
        }
        showNotification(`✨ +${xpGain} XP  |  💰 +${goldGain} Gold`);
      }

      return {
        ...prev,
        level: newLevel,
        xp: newXp,
        maxXp: newMaxXp,
        gold: prev.gold + goldGain,
        skillPoints: newSkillPoints,
      };
    });
  }, [showNotification]);

  // Create Quest
  const createQuest = useCallback((questData: Omit<QuestItem, "id" | "status">) => {
    const newQuest: QuestItem = {
      ...questData,
      id: `q-${Date.now()}`,
      status: "active",
    };
    setQuests((prev) => [newQuest, ...prev]);
    showNotification(`⚔️ Quest Accepted: "${newQuest.title}"`);
  }, [showNotification]);

  // Complete Quest
  const completeQuest = useCallback((id: string) => {
    const quest = quests.find((q) => q.id === id);
    if (!quest || quest.status === "completed") return;

    setQuests((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              status: "completed",
              completedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }
          : q
      )
    );

    addRewards(quest.xp, quest.gold);

    const damage = quest.diff === "Epic" ? 40 : quest.diff === "Hard" ? 25 : quest.diff === "Medium" ? 15 : 10;
    setBoss((prev) => {
      if (prev.isDefeated) return prev;
      const nextHp = Math.max(0, prev.hp - damage);
      const isDefeated = nextHp <= 0;
      if (isDefeated && !prev.isDefeated) {
        showNotification(`🔥 THE DRAGON IS DEFEATED! Claim your bounty in Boss Sanctuary!`);
      }
      return { ...prev, hp: nextHp, isDefeated };
    });

    setHistory((prev) => [
      {
        id: `h-${Date.now()}`,
        timeframe: "Today",
        title: `Quest Completed: ${quest.title}`,
        category: "Quests",
        icon: quest.emoji || "⚔️",
        desc: `Completed "${quest.desc}"`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        xp: quest.xp,
        gold: quest.gold,
        badgeColor: "badge-emerald",
      },
      ...prev,
    ]);
  }, [quests, addRewards, showNotification]);

  // Delete Quest
  const deleteQuest = useCallback((id: string) => {
    setQuests((prev) => prev.filter((q) => q.id !== id));
    showNotification("🗑️ Quest discarded.");
  }, [showNotification]);

  // Attack Boss Directly
  const attackBoss = useCallback((dmgAmount?: number) => {
    const damage = dmgAmount ?? (character.attributes.strength + 15);
    let defeated = false;

    setBoss((prev) => {
      if (prev.isDefeated) return prev;
      const nextHp = Math.max(0, prev.hp - damage);
      defeated = nextHp <= 0;
      return {
        ...prev,
        hp: nextHp,
        isDefeated: defeated,
      };
    });

    soundEffects.playHitImpact();
    if (damage >= 25 || defeated) {
      spawnCombatText(`-${damage} DMG!`, "crit");
    } else {
      spawnCombatText(`-${damage} DMG`, "dmg");
    }

    if (defeated) {
      soundEffects.playQuestComplete();
      showNotification(`🏆 CRITICAL STRIKE! The Boss has been vanquished!`);
    } else {
      showNotification(`💥 Direct Hit! Dealt ${damage} DMG to ${boss.name}!`);
    }

    return { damageDealt: damage, defeated };
  }, [character.attributes.strength, boss.name, showNotification]);

  // Claim Boss Bounty
  const claimBossReward = useCallback(() => {
    if (!boss.isDefeated || boss.rewardClaimed) return;
    setBoss((prev) => ({ ...prev, rewardClaimed: true }));
    soundEffects.playLevelUp();
    spawnCombatText("+300 XP", "xp");
    setTimeout(() => spawnCombatText("+100 GP", "gold"), 250);
    addRewards(300, 100);
    showNotification("🎉 Claimed Boss Bounty: +300 XP & +100 Gold! Achievement Unlocked: Dragon Slayer!");
    setHistory((prev) => [
      {
        id: `h-${Date.now()}`,
        timeframe: "Today",
        title: `Daily Boss Defeated: ${boss.name}`,
        category: "Boss",
        icon: "🐉",
        desc: "Claimed defeat rewards & Dragon Slayer medal",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        xp: 300,
        gold: 100,
        badgeColor: "badge-rose",
      },
      ...prev,
    ]);
  }, [boss.isDefeated, boss.rewardClaimed, boss.name, addRewards, showNotification]);

  // Shop purchase
  const buyItem = useCallback((item: {
    id: string;
    name: string;
    desc: string;
    icon: string;
    price: number;
    type: "Weapon" | "Armor" | "Accessory" | "Consumable";
    stat?: string;
    rarityClass?: string;
  }) => {
    if (character.gold < item.price) {
      showNotification("❌ Not enough gold to buy this item!");
      return false;
    }

    soundEffects.playGoldClink();
    spawnCombatText(`-${item.price} GP`, "gold");

    setCharacter((prev) => ({ ...prev, gold: prev.gold - item.price }));

    setBag((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) => (i.name === item.name ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}`,
          name: item.name,
          desc: item.desc,
          icon: item.icon,
          type: item.type,
          stat: item.stat,
          price: item.price,
          qty: 1,
          rarityClass: item.rarityClass,
        },
      ];
    });

    showNotification(`🛍️ Purchased "${item.name}" for ${item.price} GP! Added to inventory.`);
    return true;
  }, [character.gold, showNotification]);

  // Equip item
  const equipItem = useCallback((item: InventoryItem) => {
    if (item.type === "Consumable") return;
    const slot = item.type as "Weapon" | "Armor" | "Accessory";
    const currentEquipped = equipped[slot];

    setEquipped((prev) => ({ ...prev, [slot]: item }));
    setBag((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      if (currentEquipped) {
        return [...filtered, currentEquipped];
      }
      return filtered;
    });

    showNotification(`⚔️ Equipped "${item.name}" into ${slot} slot!`);
  }, [equipped, showNotification]);

  // Unequip item
  const unequipItem = useCallback((slot: "Weapon" | "Armor" | "Accessory") => {
    const current = equipped[slot];
    if (!current) return;

    setEquipped((prev) => ({ ...prev, [slot]: null }));
    setBag((prev) => [...prev, current]);
    showNotification(`🛡️ Unequipped "${current.name}".`);
  }, [equipped, showNotification]);

  // Use consumable
  const useConsumable = useCallback((item: InventoryItem) => {
    if (item.type !== "Consumable") return;

    if (item.name.includes("Focus") || item.name.includes("Potion")) {
      setCharacter((prev) => ({ ...prev, energy: Math.min(prev.maxEnergy, prev.energy + 20) }));
      showNotification(`🧪 Consumed ${item.name}! Restored +20 Energy.`);
    } else if (item.name.includes("Vitality") || item.name.includes("Elixir") || item.name.includes("Health")) {
      setCharacter((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + 25) }));
      showNotification(`❤️ Consumed ${item.name}! Restored +25 Health.`);
    } else {
      showNotification(`✨ Used ${item.name}!`);
    }

    setBag((prev) =>
      prev
        .map((i) => (i.id === item.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }, [showNotification]);

  // Complete Focus Session
  const completeFocusSession = useCallback((minutes: number) => {
    setTodayFocusCount((prev) => prev + 1);
    addRewards(25, 5);
    setHistory((prev) => [
      {
        id: `h-${Date.now()}`,
        timeframe: "Today",
        title: `Focus Sprint (${minutes}m)`,
        category: "Focus",
        icon: "🧘",
        desc: `Completed a deep work session of ${minutes} mins`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        xp: 25,
        gold: 5,
        badgeColor: "badge-violet",
      },
      ...prev,
    ]);
  }, [addRewards]);

  // Auth actions
  const loginUser = useCallback((email: string, name?: string) => {
    const heroName = name || email.split("@")[0] || "Hero";
    setUser({ id: `usr-${Date.now()}`, email, name: heroName });
    setCharacter((prev) => ({ ...prev, name: heroName }));
    showNotification(`✨ Welcome back, ${heroName}! Adventure loaded.`);
    router.push("/dashboard");
  }, [router, showNotification]);

  const logoutUser = useCallback(() => {
    setUser(null);
    showNotification("Logged out. See you soon, hero!");
    router.push("/login");
  }, [router, showNotification]);

  const activeQuests = quests.filter((q) => q.status === "active");
  const completedQuests = quests.filter((q) => q.status === "completed");

  return (
    <GameContext.Provider
      value={{
        character,
        quests,
        boss,
        inventory: { equipped, bag },
        history,
        activeQuests,
        completedQuests,
        todayFocusCount,
        user,
        notification,
        isBackendConnected,
        isHydrated,
        createQuest,
        completeQuest,
        deleteQuest,
        attackBoss,
        claimBossReward,
        buyItem,
        equipItem,
        unequipItem,
        useConsumable,
        completeFocusSession,
        loginUser,
        logoutUser,
        showNotification,
        resetGame,
      }}
    >
      {children}
      {/* Global Toast Notification */}
      {notification && (
        <div className="toast">
          <span style={{ fontSize: "20px" }}>⚡</span>
          <span style={{ fontWeight: 600, fontSize: "14px", color: "var(--text)" }}>{notification}</span>
        </div>
      )}
    </GameContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
}
