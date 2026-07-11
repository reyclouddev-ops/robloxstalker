const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const result = document.getElementById("result");

searchBtn.addEventListener("click", stalk);
usernameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") stalk();
});

async function stalk() {

    const username = usernameInput.value.trim();

    if (!username) {
        showError("Masukkan username Roblox.");
        return;
    }

    loading.classList.remove("hidden");
    result.classList.add("hidden");
    error.classList.add("hidden");

    try {

        const res = await fetch(
            `https://api.lexcode.biz.id/api/stalker/roblox?user=${encodeURIComponent(username)}`
        );

        if (!res.ok) {
            throw new Error("API tidak merespon.");
        }

        const json = await res.json();

        if (!json.success) {
            throw new Error("User tidak ditemukan.");
        }

        const data = json.result;

        document.getElementById("avatar").src = data.avatar;

        document.getElementById("displayName").textContent =
            data.display_name || "-";

        document.getElementById("usernameText").textContent =
            "@" + data.username;

        document.getElementById("userId").textContent =
            data.id;

        document.getElementById("friends").textContent =
            data.friends;

        document.getElementById("followers").textContent =
            data.followers;

        document.getElementById("following").textContent =
            data.following;

        document.getElementById("description").textContent =
            data.description || "Tidak ada bio.";

        document.getElementById("status").textContent =
            data.presence.status;

        document.getElementById("location").textContent =
            data.presence.location || "-";

        document.getElementById("banned").textContent =
            data.banned ? "Ya" : "Tidak";

        document.getElementById("created").textContent =
            formatDate(data.created);

        document.getElementById("lastOnline").textContent =
            data.presence.last_online
                ? formatDate(data.presence.last_online)
                : "-";

        const badge = document.getElementById("badgeContainer");

        badge.innerHTML = "";

        badge.innerHTML += `
        <span class="badge ${data.presence.code === 0 ? "offline" : "online"}">
            ${data.presence.status}
        </span>
        `;

        badge.innerHTML += `
        <span class="badge ${data.banned ? "banned" : "safe"}">
            ${data.banned ? "BANNED" : "SAFE"}
        </span>
        `;

        result.classList.remove("hidden");

    } catch (err) {

        showError(err.message);

    } finally {

        loading.classList.add("hidden");

    }

}

function showError(msg) {

    error.textContent = msg;

    error.classList.remove("hidden");

}

function formatDate(date) {

    const d = new Date(date);

    return d.toLocaleString("id-ID", {
        dateStyle: "long",
        timeStyle: "short"
    });

}

document.getElementById("userId").addEventListener("click", () => {

    const id = document.getElementById("userId").textContent;

    if (!id || id === "-") return;

    navigator.clipboard.writeText(id);

    alert("User ID berhasil disalin!");

});
