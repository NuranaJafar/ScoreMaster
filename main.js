document.addEventListener("DOMContentLoaded", () => {
  let scores = {
    Alice: {
      score: 80,
      history: [{ score: 80, date: "2024-01-15", reason: "Initial score" }],
    },
    Bob: {
      score: 90,
      history: [{ score: 90, date: "2024-01-15", reason: "Initial score" }],
    },
    Carol: {
      score: 70,
      history: [{ score: 70, date: "2024-01-15", reason: "Initial score" }],
    },
    Dave: {
      score: 85,
      history: [{ score: 85, date: "2024-01-15", reason: "Initial score" }],
    },
    Eve: {
      score: 95,
      history: [{ score: 95, date: "2024-01-15", reason: "Initial score" }],
    },
    Frank: {
      score: 75,
      history: [{ score: 75, date: "2024-01-15", reason: "Initial score" }],
    },
    Grace: {
      score: 88,
      history: [{ score: 88, date: "2024-01-15", reason: "Initial score" }],
    },
    Heidi: {
      score: 92,
      history: [{ score: 92, date: "2024-01-15", reason: "Initial score" }],
    },
    Ivan: {
      score: 78,
      history: [{ score: 78, date: "2024-01-15", reason: "Initial score" }],
    },
    Judy: {
      score: 82,
      history: [{ score: 82, date: "2024-01-15", reason: "Initial score" }],
    },
    Karl: {
      score: 89,
      history: [{ score: 89, date: "2024-01-15", reason: "Initial score" }],
    },
    Leo: {
      score: 91,
      history: [{ score: 91, date: "2024-01-15", reason: "Initial score" }],
    },
    Mallory: {
      score: 77,
      history: [{ score: 77, date: "2024-01-15", reason: "Initial score" }],
    },
    Nia: {
      score: 84,
      history: [{ score: 84, date: "2024-01-15", reason: "Initial score" }],
    },
    Oscar: {
      score: 93,
      history: [{ score: 93, date: "2024-01-15", reason: "Initial score" }],
    },
    Peggy: {
      score: 79,
      history: [{ score: 79, date: "2024-01-15", reason: "Initial score" }],
    },
    Quentin: {
      score: 87,
      history: [{ score: 87, date: "2024-01-15", reason: "Initial score" }],
    },
    Rupert: {
      score: 86,
      history: [{ score: 86, date: "2024-01-15", reason: "Initial score" }],
    },
    Sybil: {
      score: 94,
      history: [{ score: 94, date: "2024-01-15", reason: "Initial score" }],
    },
    Trent: {
      score: 81,
      history: [{ score: 81, date: "2024-01-15", reason: "Initial score" }],
    },
  };

  let appState = {
    currentPage: 1,
    itemsPerPage: 8,
    sortBy: "name",
    sortOrder: "asc",
    searchQuery: "",
    theme: "dark",
    recentActivities: [],
    chart: null,
  };

  const elements = {
    scoresContainer: document.getElementById("scores"),
    playerSelect: document.getElementById("playerSelect"),
    scoreInput: document.getElementById("scoreInput"),
    scoreSlider: document.getElementById("scoreSlider"),
    scoreReason: document.getElementById("scoreReason"),
    searchInput: document.getElementById("searchInput"),
    newPlayerName: document.getElementById("newPlayerName"),
    newPlayerScore: document.getElementById("newPlayerScore"),
    totalPlayers: document.getElementById("totalPlayers"),
    avgScore: document.getElementById("avgScore"),
    topScore: document.getElementById("topScore"),
    scoreRange: document.getElementById("scoreRange"),
    pageInfo: document.getElementById("pageInfo"),
    prevPage: document.getElementById("prevPage"),
    nextPage: document.getElementById("nextPage"),
    toast: document.getElementById("toast"),
    toastTitle: document.getElementById("toastTitle"),
    toastMessage: document.getElementById("toastMessage"),
    confirmationModal: document.getElementById("confirmationModal"),
    playerModal: document.getElementById("playerModal"),
    modalMessage: document.getElementById("modalMessage"),
    modalPlayerName: document.getElementById("modalPlayerName"),
    modalPlayerScore: document.getElementById("modalPlayerScore"),
    modalPlayerRank: document.getElementById("modalPlayerRank"),
    modalPlayerPerformance: document.getElementById("modalPlayerPerformance"),
    modalPlayerUpdated: document.getElementById("modalPlayerUpdated"),
    currentYear: document.getElementById("currentYear"),
    activityList: document.querySelector(".activity-list"),
    historyList: document.querySelector(".history-list"),
  };
  const buttons = {
    updateButton: document.getElementById("updateButton"),
    addPlayerButton: document.getElementById("addPlayerButton"),
    getTopScorersButton: document.getElementById("getTopScorersButton"),
    getBottomScorersButton: document.getElementById("getBottomScorersButton"),
    calculateAverageButton: document.getElementById("calculateAverageButton"),
    randomizeScores: document.getElementById("randomizeScores"),
    exportData: document.getElementById("exportData"),
    resetScoresButton: document.getElementById("resetScoresButton"),
    themeToggle: document.getElementById("themeToggle"),
    exportBtn: document.getElementById("exportBtn"),
    sortToggle: document.getElementById("sortToggle"),
    editPlayer: document.getElementById("editPlayer"),
    deletePlayer: document.getElementById("deletePlayer"),
    modalCancel: document.getElementById("modalCancel"),
    modalConfirm: document.getElementById("modalConfirm"),
  };

  const modalCloseButtons = document.querySelectorAll(".modal-close");

  function showToast(message, title = "Success", type = "success") {
    elements.toastTitle.textContent = title;
    elements.toastMessage.textContent = message;
    elements.toast.className = `toast ${type}`;
    elements.toast.classList.add("show");

    setTimeout(() => {
      elements.toast.classList.remove("show");
    }, 3000);
  }

  function showModal(modal, message = "") {
    if (message) elements.modalMessage.textContent = message;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function hideModal(modal) {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function formatDate(date = new Date()) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getPlayerRank(playerName) {
    const sortedPlayers = Object.entries(scores).sort(
      (a, b) => b[1].score - a[1].score,
    );
    return sortedPlayers.findIndex(([name]) => name === playerName) + 1;
  }

  function getPerformanceLevel(score) {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Average";
    if (score >= 60) return "Below Average";
    return "Poor";
  }

  function addActivity(action, playerName, details) {
    const activity = {
      id: Date.now(),
      type: action,
      player: playerName,
      details: details,
      timestamp: new Date(),
    };

    appState.recentActivities.unshift(activity);
    if (appState.recentActivities.length > 10) {
      appState.recentActivities.pop();
    }

    updateActivityList();
  }

  function calculateStats() {
    const players = Object.keys(scores);
    const scoresList = players.map((name) => scores[name].score);

    const totalPlayers = players.length;
    const totalScore = scoresList.reduce((sum, score) => sum + score, 0);
    const averageScore = (totalScore / totalPlayers).toFixed(1);
    const highestScore = Math.max(...scoresList);
    const lowestScore = Math.min(...scoresList);
    const scoreRangeValue = highestScore - lowestScore;

    elements.totalPlayers.textContent = totalPlayers;
    elements.avgScore.textContent = averageScore;
    elements.topScore.textContent = highestScore;
    elements.scoreRange.textContent = scoreRangeValue;

    updateScoreDistribution();

    if (appState.chart) {
      updateChart();
    }
  }

  function updateScoreDistribution() {
    const scoresList = Object.values(scores).map((p) => p.score);
    const ranges = {
      "90-100": 0,
      "80-89": 0,
      "70-79": 0,
      "60-69": 0,
      "0-59": 0,
    };

    scoresList.forEach((score) => {
      if (score >= 90) ranges["90-100"]++;
      else if (score >= 80) ranges["80-89"]++;
      else if (score >= 70) ranges["70-79"]++;
      else if (score >= 60) ranges["60-69"]++;
      else ranges["0-59"]++;
    });

    const total = scoresList.length;
    document.querySelectorAll(".chart-bar").forEach((bar) => {
      const range = bar.dataset.range;
      const count = ranges[range] || 0;
      const percentage = total > 0 ? ((count / total) * 100).toFixed(0) : 0;

      bar.style.setProperty("--percentage", `${percentage}%`);
      bar.querySelector(".bar-value").textContent = `${percentage}%`;
    });
  }

  function getFilteredAndSortedPlayers() {
    let players = Object.entries(scores);

    if (appState.searchQuery) {
      const query = appState.searchQuery.toLowerCase();
      players = players.filter(([name]) => name.toLowerCase().includes(query));
    }

    players.sort((a, b) => {
      let comparison = 0;

      if (appState.sortBy === "name") {
        comparison = a[0].localeCompare(b[0]);
      } else if (appState.sortBy === "score") {
        comparison = a[1].score - b[1].score;
      }

      return appState.sortOrder === "asc" ? comparison : -comparison;
    });

    return players;
  }

  function getPaginatedPlayers() {
    const players = getFilteredAndSortedPlayers();
    const startIndex = (appState.currentPage - 1) * appState.itemsPerPage;
    const endIndex = startIndex + appState.itemsPerPage;
    return {
      players: players.slice(startIndex, endIndex),
      total: players.length,
      totalPages: Math.ceil(players.length / appState.itemsPerPage),
    };
  }

  function displayScores() {
    const { players, total, totalPages } = getPaginatedPlayers();
    elements.scoresContainer.innerHTML = "";

    players.forEach(([name, data], index) => {
      const rank = getPlayerRank(name);
      const scoreItem = document.createElement("div");
      scoreItem.className = "score-item";
      scoreItem.dataset.player = name;

      let borderColor = "#4361ee";
      if (data.score >= 90) borderColor = "#10b981";
      else if (data.score >= 80) borderColor = "#3b82f6";
      else if (data.score >= 70) borderColor = "#f59e0b";
      else borderColor = "#ef4444";

      scoreItem.style.borderLeftColor = borderColor;

      scoreItem.innerHTML = `
                <div class="player-info">
                    <div class="player-avatar" style="background: linear-gradient(135deg, ${borderColor} 0%, ${borderColor}99 100%)">
                        <i class="fas fa-user"></i>
                    </div>
                    <div>
                        <div class="player-name">${name}</div>
                        <div class="player-rank">Rank: #${rank}</div>
                    </div>
                </div>
                <div class="player-score">${data.score}</div>
                <div class="player-actions">
                    <button class="btn-icon view-player" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon edit-score" title="Edit Score">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            `;

      elements.scoresContainer.appendChild(scoreItem);

      const viewBtn = scoreItem.querySelector(".view-player");
      const editBtn = scoreItem.querySelector(".edit-score");

      viewBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        showPlayerDetails(name);
      });

      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        populatePlayerSelect(name);
        elements.scoreInput.value = data.score;
        elements.scoreSlider.value = data.score;
        elements.scoreInput.focus();
      });

      scoreItem.addEventListener("click", () => {
        showPlayerDetails(name);
      });
    });

    elements.pageInfo.textContent = `Page ${appState.currentPage} of ${totalPages || 1}`;
    elements.prevPage.disabled = appState.currentPage === 1;
    elements.nextPage.disabled =
      appState.currentPage === totalPages || totalPages === 0;

    updatePlayerSelect();

    calculateStats();
  }

  function updatePlayerSelect() {
    elements.playerSelect.innerHTML =
      '<option value="">Select a player</option>';

    Object.keys(scores)
      .sort()
      .forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = `${name} (${scores[name].score})`;
        elements.playerSelect.appendChild(option);
      });
  }

  function populatePlayerSelect(playerName) {
    elements.playerSelect.value = playerName;
  }

  function updateActivityList() {
    elements.activityList.innerHTML = "";

    appState.recentActivities.forEach((activity) => {
      const activityItem = document.createElement("div");
      activityItem.className = `activity-item ${activity.type}`;

      let icon = "fas fa-sync-alt";
      let colorClass = "update";

      if (activity.type === "add") {
        icon = "fas fa-user-plus";
        colorClass = "add";
      } else if (activity.type === "delete") {
        icon = "fas fa-user-minus";
        colorClass = "delete";
      }

      activityItem.innerHTML = `
                <div class="activity-icon ${colorClass}">
                    <i class="${icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">${activity.details}</div>
                    <div class="activity-desc">Player: ${activity.player}</div>
                </div>
                <div class="activity-time">${formatDate(activity.timestamp)}</div>
            `;

      elements.activityList.appendChild(activityItem);
    });
  }

  function showPlayerDetails(playerName) {
    const playerData = scores[playerName];
    if (!playerData) return;

    elements.modalPlayerName.textContent = playerName;
    elements.modalPlayerScore.textContent = playerData.score;
    elements.modalPlayerRank.textContent = `#${getPlayerRank(playerName)}`;
    elements.modalPlayerPerformance.textContent = getPerformanceLevel(
      playerData.score,
    );

    const lastUpdate = playerData.history[playerData.history.length - 1];
    elements.modalPlayerUpdated.textContent = formatDate(
      new Date(lastUpdate.date),
    );

    elements.historyList.innerHTML = "";
    playerData.history
      .slice()
      .reverse()
      .forEach((record) => {
        const historyItem = document.createElement("div");
        historyItem.className = "history-item";
        historyItem.innerHTML = `
                <div>
                    <div>Score: ${record.score}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted)">${record.reason || "No reason provided"}</div>
                </div>
                <div style="font-size: 0.8rem; color: var(--text-secondary)">${record.date}</div>
            `;
        elements.historyList.appendChild(historyItem);
      });

    buttons.editPlayer.onclick = () => {
      hideModal(elements.playerModal);
      populatePlayerSelect(playerName);
      elements.scoreInput.value = playerData.score;
      elements.scoreSlider.value = playerData.score;
      elements.scoreInput.focus();
    };

    buttons.deletePlayer.onclick = () => {
      hideModal(elements.playerModal);
      showModal(
        elements.confirmationModal,
        `Are you sure you want to delete ${playerName}? This action cannot be undone.`,
      );
      buttons.modalConfirm.onclick = () => {
        deletePlayer(playerName);
        hideModal(elements.confirmationModal);
      };
    };

    showModal(elements.playerModal);
  }

  function updateScore(playerName, newScore, reason = "") {
    if (!scores[playerName]) {
      showToast(`Player "${playerName}" not found!`, "Error", "error");
      return false;
    }

    const oldScore = scores[playerName].score;
    scores[playerName].score = parseInt(newScore);

    scores[playerName].history.push({
      score: newScore,
      date: new Date().toISOString().split("T")[0],
      reason: reason || `Score updated from ${oldScore} to ${newScore}`,
    });

    displayScores();

    addActivity(
      "update",
      playerName,
      `Score updated from ${oldScore} to ${newScore}`,
    );

    showToast(
      `Updated ${playerName}'s score to ${newScore}`,
      "Success",
      "success",
    );
    return true;
  }

  function addPlayer(name, initialScore = 0) {
    if (scores[name]) {
      showToast(`Player "${name}" already exists!`, "Error", "error");
      return false;
    }

    scores[name] = {
      score: parseInt(initialScore),
      history: [
        {
          score: initialScore,
          date: new Date().toISOString().split("T")[0],
          reason: "Player added",
        },
      ],
    };

    displayScores();

    addActivity("add", name, `New player added with score ${initialScore}`);

    showToast(`Added new player: ${name}`, "Success", "success");
    return true;
  }

  function deletePlayer(playerName) {
    if (!scores[playerName]) {
      showToast(`Player "${playerName}" not found!`, "Error", "error");
      return false;
    }

    delete scores[playerName];
    displayScores();

    addActivity("delete", playerName, "Player removed from system");

    showToast(`Removed player: ${playerName}`, "Success", "success");
    return true;
  }

  function randomizeScores() {
    Object.keys(scores).forEach((name) => {
      const oldScore = scores[name].score;
      const newScore = Math.floor(Math.random() * 101); // 0-100

      scores[name].score = newScore;
      scores[name].history.push({
        score: newScore,
        date: new Date().toISOString().split("T")[0],
        reason: `Randomized from ${oldScore} to ${newScore}`,
      });
    });

    displayScores();
    addActivity("update", "All Players", "All scores randomized");
    showToast("All scores have been randomized", "Randomized", "info");
  }

  function resetScores() {
    showModal(
      elements.confirmationModal,
      "Are you sure you want to reset all scores to their initial values?",
    );
    buttons.modalConfirm.onclick = () => {
      const initialScores = {
        Alice: 80,
        Bob: 90,
        Carol: 70,
        Dave: 85,
        Eve: 95,
        Frank: 75,
        Grace: 88,
        Heidi: 92,
        Ivan: 78,
        Judy: 82,
        Karl: 89,
        Leo: 91,
        Mallory: 77,
        Nia: 84,
        Oscar: 93,
        Peggy: 79,
        Quentin: 87,
        Rupert: 86,
        Sybil: 94,
        Trent: 81,
      };

      Object.keys(initialScores).forEach((name) => {
        if (scores[name]) {
          const oldScore = scores[name].score;
          const newScore = initialScores[name];

          scores[name].score = newScore;
          scores[name].history.push({
            score: newScore,
            date: new Date().toISOString().split("T")[0],
            reason: `Reset from ${oldScore} to ${newScore}`,
          });
        }
      });

      displayScores();
      hideModal(elements.confirmationModal);
      addActivity(
        "update",
        "All Players",
        "All scores reset to initial values",
      );
      showToast(
        "All scores have been reset to initial values",
        "Reset Complete",
        "success",
      );
    };
  }

  function exportData() {
    const dataStr = JSON.stringify(scores, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `player-scores-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    showToast("Data exported successfully", "Export Complete", "success");
  }

  // ===== CHART FUNCTIONS =====
  function initializeChart() {
    const ctx = document.getElementById("scoreTrendChart").getContext("2d");

    const scoresList = Object.values(scores).map((p) => p.score);
    const players = Object.keys(scores);

    // Create sample trend data
    const trendData = [];
    let current = 85;
    for (let i = 0; i < 12; i++) {
      trendData.push(current + Math.random() * 10 - 5);
      current = trendData[trendData.length - 1];
    }

    appState.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Average Score Trend",
            data: trendData,
            borderColor: "#4361ee",
            backgroundColor: "rgba(67, 97, 238, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "var(--text-primary)",
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "var(--text-secondary)",
            },
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "var(--text-secondary)",
            },
            suggestedMin: 60,
            suggestedMax: 100,
          },
        },
      },
    });
  }

  function updateChart() {
    if (!appState.chart) return;

    // Update chart data with current scores
    const scoresList = Object.values(scores).map((p) => p.score);
    const avgScore = scoresList.reduce((a, b) => a + b, 0) / scoresList.length;

    // Add new data point to trend
    const currentMonth = new Date().getMonth();
    appState.chart.data.labels[currentMonth] = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][currentMonth];

    // Simulate trend update
    const lastValue =
      appState.chart.data.datasets[0].data[currentMonth] || avgScore;
    const newValue = lastValue + (Math.random() * 4 - 2);
    appState.chart.data.datasets[0].data[currentMonth] = Math.max(
      60,
      Math.min(100, newValue),
    );

    appState.chart.update();
  }

  // ===== EVENT HANDLERS =====
  function setupEventListeners() {
    // Update score button
    buttons.updateButton.addEventListener("click", () => {
      const playerName = elements.playerSelect.value;
      const newScore = elements.scoreInput.value;
      const reason = elements.scoreReason.value;

      if (playerName && newScore && !isNaN(newScore)) {
        updateScore(playerName, newScore, reason);
        elements.scoreReason.value = "";
      } else {
        showToast(
          "Please select a player and enter a valid score!",
          "Error",
          "error",
        );
      }
    });

    // Add player button
    buttons.addPlayerButton.addEventListener("click", () => {
      const name = elements.newPlayerName.value.trim();
      const score = elements.newPlayerScore.value;

      if (name && !isNaN(score)) {
        if (addPlayer(name, score)) {
          elements.newPlayerName.value = "";
          elements.newPlayerScore.value = "0";
        }
      } else {
        showToast("Please enter a valid name and score!", "Error", "error");
      }
    });

    // Quick action buttons
    buttons.getTopScorersButton.addEventListener("click", () => {
      const sorted = Object.entries(scores).sort(
        (a, b) => b[1].score - a[1].score,
      );
      const top3 = sorted
        .slice(0, 3)
        .map(([name, data], i) => `${i + 1}. ${name}: ${data.score}`);
      showToast(`Top Scorers:\n${top3.join("\n")}`, "Top 3 Scorers", "info");
    });

    buttons.getBottomScorersButton.addEventListener("click", () => {
      const sorted = Object.entries(scores).sort(
        (a, b) => a[1].score - b[1].score,
      );
      const bottom3 = sorted
        .slice(0, 3)
        .map(([name, data], i) => `${i + 1}. ${name}: ${data.score}`);
      showToast(
        `Bottom Scorers:\n${bottom3.join("\n")}`,
        "Bottom 3 Scorers",
        "warning",
      );
    });

    buttons.calculateAverageButton.addEventListener("click", () => {
      const scoresList = Object.values(scores).map((p) => p.score);
      const avg = (
        scoresList.reduce((a, b) => a + b, 0) / scoresList.length
      ).toFixed(2);
      showToast(`Average Score: ${avg}`, "Average Calculation", "info");
    });

    buttons.randomizeScores.addEventListener("click", randomizeScores);
    buttons.exportData.addEventListener("click", exportData);
    buttons.resetScoresButton.addEventListener("click", resetScores);

    // Theme toggle
    buttons.themeToggle.addEventListener("click", () => {
      appState.theme = appState.theme === "dark" ? "light" : "dark";
      document.body.classList.toggle("light-theme", appState.theme === "light");
      buttons.themeToggle.innerHTML =
        appState.theme === "dark"
          ? '<i class="fas fa-moon"></i>'
          : '<i class="fas fa-sun"></i>';

      localStorage.setItem("scoreboard-theme", appState.theme);
      showToast(`Switched to ${appState.theme} theme`, "Theme Changed", "info");
    });

    // Search input
    elements.searchInput.addEventListener("input", (e) => {
      appState.searchQuery = e.target.value;
      appState.currentPage = 1;
      displayScores();
    });

    // Sort toggle
    buttons.sortToggle.addEventListener("click", () => {
      if (appState.sortBy === "name") {
        appState.sortBy = "score";
        appState.sortOrder = "desc";
        buttons.sortToggle.innerHTML =
          '<i class="fas fa-sort-amount-down-alt"></i>';
      } else if (appState.sortBy === "score" && appState.sortOrder === "desc") {
        appState.sortBy = "score";
        appState.sortOrder = "asc";
        buttons.sortToggle.innerHTML = '<i class="fas fa-sort-amount-up"></i>';
      } else {
        appState.sortBy = "name";
        appState.sortOrder = "asc";
        buttons.sortToggle.innerHTML = '<i class="fas fa-sort-alpha-down"></i>';
      }

      displayScores();
    });

    // Pagination
    elements.prevPage.addEventListener("click", () => {
      if (appState.currentPage > 1) {
        appState.currentPage--;
        displayScores();
      }
    });

    elements.nextPage.addEventListener("click", () => {
      const { totalPages } = getPaginatedPlayers();
      if (appState.currentPage < totalPages) {
        appState.currentPage++;
        displayScores();
      }
    });

    // Score slider sync
    elements.scoreSlider.addEventListener("input", (e) => {
      elements.scoreInput.value = e.target.value;
    });

    elements.scoreInput.addEventListener("input", (e) => {
      elements.scoreSlider.value = e.target.value;
    });

    // Modal close buttons
    modalCloseButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        hideModal(btn.closest(".modal"));
      });
    });

    buttons.modalCancel.addEventListener("click", () => {
      hideModal(elements.confirmationModal);
    });

    // Click outside modal to close
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        hideModal(e.target);
      }
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hideModal(elements.confirmationModal);
        hideModal(elements.playerModal);
      }

      // Ctrl+U to focus update form
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        elements.playerSelect.focus();
      }

      // Ctrl+A to focus add player form
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        elements.newPlayerName.focus();
      }
    });

    // Initialize some sample activities
    addActivity("add", "System", "Application initialized with sample data");
    addActivity("update", "System", "Dashboard loaded successfully");
  }


  function initializeApp() {
    elements.currentYear.textContent = new Date().getFullYear();
    const savedTheme = localStorage.getItem("scoreboard-theme");
    if (savedTheme) {
      appState.theme = savedTheme;
      document.body.classList.toggle("light-theme", appState.theme === "light");
      buttons.themeToggle.innerHTML =
        appState.theme === "dark"
          ? '<i class="fas fa-moon"></i>'
          : '<i class="fas fa-sun"></i>';
    }

    initializeChart();


    setupEventListeners();


    displayScores();


    setTimeout(() => {
      showToast(
        "Welcome to ScoreMaster Pro! Dashboard loaded successfully.",
        "Ready",
        "success",
      );
    }, 1000);
  }


  initializeApp();
});
