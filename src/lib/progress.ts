export interface ActivityItem {
    id: string; // unique ID
    type: 'Grammar' | 'Vocab' | 'Exam';
    title: string;
    score: number;
    total: number;
    timestamp: number;
}

export interface UserProgress {
    xp: number;
    level: number;
    streak: number;
    lastVisitDate: string; // YYYY-MM-DD
    recentActivities: ActivityItem[];
}

const STORAGE_KEY = 'hola_spanish_progress_v1';

const INITIAL_STATE: UserProgress = {
    xp: 0,
    level: 1,
    streak: 0,
    lastVisitDate: '',
    recentActivities: []
};

// --- Helper: Get Today's Date String ---
const getTodayString = () => new Date().toISOString().split('T')[0];

// --- 1. Get Progress ---
export const getUserProgress = (): UserProgress => {
    if (typeof window === 'undefined') return INITIAL_STATE;
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return INITIAL_STATE;

    try {
        return JSON.parse(stored);
    } catch {
        return INITIAL_STATE;
    }
};

// --- 2. Save/Update Quiz Result ---
export const saveQuizResult = (
    type: 'Grammar' | 'Vocab' | 'Exam',
    title: string,
    score: number,
    total: number
) => {
    if (typeof window === 'undefined') return;

    const current = getUserProgress();
    const today = getTodayString();

    // 1) Update Streak
    let newStreak = current.streak;
    if (current.lastVisitDate !== today) {
        // If last visit was yesterday, increment streak.
        // If last visit was older, reset streak to 1.
        // If last visit was today, do nothing.
        
        const lastDate = new Date(current.lastVisitDate);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];

        if (current.lastVisitDate === yesterdayString) {
            newStreak += 1;
        } else if (current.lastVisitDate !== today) {
            newStreak = 1; 
        }
    } else if (newStreak === 0) {
        newStreak = 1; // First activity of the day/ever
    }

    // 2) Calculate XP (Example: 10 XP per correct answer)
    const gainedXP = score * 10;
    const newXP = current.xp + gainedXP;
    
    // 3) Calculate Level (Simple logic: Level up every 500 XP)
    const newLevel = Math.floor(newXP / 500) + 1;

    // 4) Add to Recent Activities
    const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type,
        title,
        score,
        total,
        timestamp: Date.now()
    };

    // Keep only last 5 activities
    const updatedActivities = [newActivity, ...current.recentActivities].slice(0, 5);

    const newState: UserProgress = {
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        lastVisitDate: today,
        recentActivities: updatedActivities
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    
    // Trigger a storage event manually so other components can listen if needed
    window.dispatchEvent(new Event('storage'));
};

// --- 3. Reset (For Debugging) ---
export const resetProgress = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
};
