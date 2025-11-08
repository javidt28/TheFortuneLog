// Name Modal Component
function NameModal({ onConfirm, onSkip }) {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            setIsSubmitting(true);
            onConfirm(name.trim());
        }
    };

    return (
        <div className="name-modal-overlay">
            <div className="name-modal">
                <div className="name-modal-header">
                    <h2 className="name-modal-title">Welcome to TheFortuneLog!</h2>
                    <p className="name-modal-subtitle">Enter your name to personalize your fortunes</p>
                </div>
                <form onSubmit={handleSubmit} className="name-modal-form">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name..."
                        className="name-input"
                        autoFocus
                        maxLength={50}
                    />
                    <div className="name-modal-actions">
                        <button
                            type="button"
                            onClick={onSkip}
                            className="btn btn-secondary name-skip-btn"
                        >
                            Skip
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary name-submit-btn"
                            disabled={!name.trim() || isSubmitting}
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Toast Notification Component
function Toast({ message, onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast">
            <span>{message}</span>
            <button onClick={onClose} className="toast-close">×</button>
        </div>
    );
}

// Stat Card Component
function StatCard({ value, label, icon }) {
    return (
        <div className="stat-card">
            <div className="stat-icon">{icon}</div>
            <div className="stat-content">
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
            </div>
        </div>
    );
}

// Stats Bar Component
function StatsBar({ fortunes }) {
    const stats = useMemo(() => {
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();

        const thisMonthFortunes = fortunes.filter(f => {
            const date = new Date(f.date);
            return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
        });

        const thisYearFortunes = fortunes.filter(f => {
            const date = new Date(f.date);
            return date.getFullYear() === thisYear;
        });

        return {
            total: fortunes.length,
            thisMonth: thisMonthFortunes.length,
            thisYear: thisYearFortunes.length
        };
    }, [fortunes]);

    return (
        <div className="stats-bar">
            <StatCard value={stats.total} label="Total Fortunes" icon="" />
            <StatCard value={stats.thisMonth} label="This Month" icon="📅" />
            <StatCard value={stats.thisYear} label="This Year" icon="✨" />
        </div>
    );
}

// Fortune Card Component
function FortuneCard({ fortune, duplicateCount, style }) {
    const date = new Date(fortune.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className={`fortune-card ${duplicateCount > 1 ? 'duplicate' : ''}`} style={style}>
            {duplicateCount > 1 && (
                <div className="duplicate-badge">
                    <span className="duplicate-icon">🔄</span>
                    <span className="duplicate-text">×{duplicateCount}</span>
                </div>
            )}
            <div className="fortune-card-content">
                <div className="fortune-text-wrapper">
                    <div className="fortune-text">{fortune.text}</div>
                </div>
                <div className="fortune-footer">
                    <div className="fortune-meta">
                        <div className="fortune-date">
                            <span>{formattedDate}</span>
                            <span className="time-separator">•</span>
                            <span>{formattedTime}</span>
                        </div>
                        {fortune.author && (
                            <div className="fortune-author">
                                <span className="author-label">by</span>
                                <span className="author-name">{fortune.author}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Fortune Form Component
function FortuneForm({ onAdd }) {
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedText = text.trim();
        if (!trimmedText || isSubmitting) return;

        setIsSubmitting(true);
        onAdd(trimmedText);
        setText('');
        setTimeout(() => setIsSubmitting(false), 300);
    };

    return (
        <div className="add-fortune-section">
            <div className="section-title">
                <h2>Add New Fortune</h2>
                <p className="section-subtitle">Capture your fortune cookie wisdom</p>
            </div>
            <form onSubmit={handleSubmit} className="fortune-form">
                <div className="textarea-wrapper">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter your fortune cookie message..."
                        rows="4"
                        className="fortune-textarea"
                        required
                    />
                    <div className="textarea-footer">
                        <span className="char-count">{text.length} characters</span>
                    </div>
                </div>
                <div className="form-actions">
                    <button 
                        type="submit" 
                        className={`btn btn-primary ${isSubmitting ? 'submitting' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : '🥠 Add Fortune'}
                    </button>
                </div>
            </form>
        </div>
    );
}

// Fortune List Component
function FortuneList({ fortunes, searchTerm, sortBy }) {
    const filteredAndSorted = useMemo(() => {
        let filtered = fortunes.filter(fortune =>
            fortune.text.toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch (sortBy) {
            case 'newest':
                filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'alphabetical':
                filtered.sort((a, b) => a.text.localeCompare(b.text));
                break;
        }

        return filtered;
    }, [fortunes, searchTerm, sortBy]);

    // Calculate duplicate counts for each fortune text
    const duplicateCounts = useMemo(() => {
        const counts = {};
        fortunes.forEach(fortune => {
            const text = fortune.text.toLowerCase().trim();
            counts[text] = (counts[text] || 0) + 1;
        });
        return counts;
    }, [fortunes]);

    if (filteredAndSorted.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon"></div>
                <p className="empty-text">
                    {searchTerm 
                        ? `No fortunes found matching "${searchTerm}"`
                        : "No fortunes yet. Add your first one above!"
                    }
                </p>
            </div>
        );
    }

    return (
        <div className="fortunes-list">
            {filteredAndSorted.map((fortune, index) => {
                const duplicateCount = duplicateCounts[fortune.text.toLowerCase().trim()] || 1;
                return (
                    <FortuneCard
                        key={fortune.id}
                        fortune={fortune}
                        duplicateCount={duplicateCount}
                        style={{ '--delay': index }}
                    />
                );
            })}
        </div>
    );
}

// Main App Component
function App() {
    const [fortunes, setFortunes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [toast, setToast] = useState(null);
    const [syncStatus, setSyncStatus] = useState('loading'); // 'loading', 'synced', 'error'
    const [isInitialized, setIsInitialized] = useState(false);
    const [userName, setUserName] = useState(() => {
        return localStorage.getItem('fortuneUserName') || '';
    });
    const [showNameModal, setShowNameModal] = useState(() => {
        return !localStorage.getItem('fortuneUserNameSet');
    });

    // Initialize Firebase sync on mount
    useEffect(() => {
        let unsubscribe = null;

        const initializeFirebaseSync = async () => {
            // Check if Firebase is available and configured
            if (typeof firebase === 'undefined' || !isFirebaseReady || !db) {
                setSyncStatus('error');
                showToast('Firebase not configured. Please check firebase-config.js');
                setIsInitialized(true);
                return;
            }

            try {
                setSyncStatus('loading');
                
                // Use shared collection for all fortunes (no user-specific path)
                const fortunesRef = db.collection('fortunes');
                
                // Set up real-time listener for changes
                unsubscribe = fortunesRef.onSnapshot((snapshot) => {
                    const cloudFortunes = snapshot.docs.map(doc => ({
                        id: doc.id,
                        text: doc.data().text,
                        date: doc.data().date,
                        author: doc.data().author || null
                    }));
                    setFortunes(cloudFortunes);
                    setSyncStatus('synced');
                    setIsInitialized(true);
                }, (error) => {
                    console.error('Firebase sync error:', error);
                    setSyncStatus('error');
                    showToast('Error syncing with Firebase');
                    setIsInitialized(true);
                });
            } catch (error) {
                console.error('Firebase initialization error:', error);
                setSyncStatus('error');
                showToast('Failed to connect to Firebase');
                setIsInitialized(true);
            }
        };

        initializeFirebaseSync();

        // Cleanup function
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, []);

    const saveToFirebase = async (fortunesArray) => {
        if (!db) {
            console.error('Firebase not ready:', { db: !!db });
            return;
        }
        
        try {
            // Use shared collection for all fortunes
            const fortunesRef = db.collection('fortunes');
            const batch = db.batch();
            
            // Clear existing
            const snapshot = await fortunesRef.get();
            snapshot.docs.forEach(doc => batch.delete(doc.ref));
            
            // Add all fortunes
            fortunesArray.forEach(fortune => {
                const docRef = fortunesRef.doc(String(fortune.id));
                batch.set(docRef, {
                    text: fortune.text,
                    date: fortune.date,
                    author: fortune.author || null
                });
            });
            
            await batch.commit();
            console.log('Successfully saved', fortunesArray.length, 'fortunes to Firebase');
        } catch (error) {
            console.error('Error saving to Firebase:', error);
            console.error('Error details:', {
                code: error.code,
                message: error.message
            });
            showToast(`Error saving to Firebase: ${error.message}`);
        }
    };

    const showToast = (message) => {
        setToast(message);
    };

    const handleNameConfirm = (name) => {
        setUserName(name);
        localStorage.setItem('fortuneUserName', name);
        localStorage.setItem('fortuneUserNameSet', 'true');
        setShowNameModal(false);
        showToast(`Welcome, ${name}! 🎉`);
    };

    const handleNameSkip = () => {
        localStorage.setItem('fortuneUserNameSet', 'true');
        setShowNameModal(false);
    };

    const addFortune = async (text) => {
        // Ensure text ends with a period
        let formattedText = text.toUpperCase().trim();
        if (formattedText && !formattedText.match(/[.!?]$/)) {
            formattedText += '.';
        }
        
        const newFortune = {
            id: Date.now().toString(),
            text: formattedText,
            date: new Date().toISOString(),
            author: userName || null
        };
        
        const updatedFortunes = [...fortunes, newFortune];
        setFortunes(updatedFortunes);
                showToast('Fortune added successfully!');
        
        // Sync to Firebase
        try {
            await saveToFirebase(updatedFortunes);
        } catch (error) {
            console.error('Failed to save fortune:', error);
            showToast('Fortune added locally but failed to sync');
        }
    };

    const deleteFortune = async (id) => {
        const updatedFortunes = fortunes.filter(f => f.id !== id);
        setFortunes(updatedFortunes);
        showToast('Fortune deleted');
        
        // Sync to Firebase
        await saveToFirebase(updatedFortunes);
    };

    const exportFortunes = () => {
        const dataStr = JSON.stringify(fortunes, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `fortunes-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast('Fortunes exported successfully!');
    };

    const importFortunes = async (file) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    const existingIds = new Set(fortunes.map(f => f.id));
                    const newFortunes = imported
                        .filter(f => !existingIds.has(String(f.id)))
                        .map(f => ({
                            ...f,
                            text: (() => {
                                let text = f.text.toUpperCase().trim();
                                if (text && !text.match(/[.!?]$/)) {
                                    text += '.';
                                }
                                return text;
                            })(),
                            author: f.author || userName || null
                        }));

                    if (newFortunes.length > 0) {
                        const updatedFortunes = [...fortunes, ...newFortunes];
                        setFortunes(updatedFortunes);
                        showToast(`Imported ${newFortunes.length} fortune(s)!`);
                        
                        // Sync to Firebase
                        await saveToFirebase(updatedFortunes);
                    } else {
                        showToast('No new fortunes to import');
                    }
                } else {
                    throw new Error('Invalid format');
                }
            } catch (error) {
                showToast('Error importing file. Please check the format.');
            }
        };
        reader.readAsText(file);
    };

    if (!isInitialized) {
        return (
            <div className="app">
                <header className="app-header">
                    <div className="header-content">
                        <h1 className="app-title">
                            TheFortuneLog
                        </h1>
                        <p className="app-subtitle">Loading...</p>
                    </div>
                </header>
                <div className="container" style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
                    <p>Connecting to Firebase...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {showNameModal && (
                <NameModal
                    onConfirm={handleNameConfirm}
                    onSkip={handleNameSkip}
                />
            )}
        <div className="app">
            <header className="app-header">
                <div className="header-content">
                    <h1 className="app-title">
                        TheFortuneLog
                    </h1>
                    <p className="app-subtitle">Track your fortune cookie fortunes</p>
                </div>
            </header>

            <div className="container">
                <StatsBar fortunes={fortunes} />

                <div className="main-content">
                    <FortuneForm
                        onAdd={addFortune}
                    />

                    <div className="fortunes-section">
                        <div className="section-header">
                            <div className="section-title">
                                <h2>Your Fortunes</h2>
                                <p className="section-subtitle">{fortunes.length} fortune{fortunes.length !== 1 ? 's' : ''} collected</p>
                            </div>
                            <div className="controls">
                                <div className="search-wrapper">
                                    <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder="Search fortunes..."
                                        className="search-input"
                                    />
                                </div>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="sort-select"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                    <option value="alphabetical">A-Z</option>
                                </select>
                            </div>
                        </div>
                        <FortuneList
                            fortunes={fortunes}
                            searchTerm={searchTerm}
                            sortBy={sortBy}
                        />
                    </div>
                </div>
            </div>

            {toast && (
                <Toast
                    message={toast}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
        </>
    );
}

// Render the app
const rootElement = document.getElementById('root');
if (rootElement) {
    // Use React 18's createRoot if available, otherwise fall back to ReactDOM.render
    if (ReactDOM.createRoot) {
        const root = ReactDOM.createRoot(rootElement);
        root.render(<App />);
    } else {
        ReactDOM.render(<App />, rootElement);
    }
} else {
    console.error('Root element not found!');
}

