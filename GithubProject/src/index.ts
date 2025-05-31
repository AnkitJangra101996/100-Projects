//? Get Required Elements
const resultContainer: HTMLElement =
  document.getElementById("result-container")!;
const searchInput = document.getElementById("search-input") as HTMLInputElement;
let resultCards = resultContainer.querySelectorAll(
  ".result-card"
) as NodeListOf<HTMLElement>;
const errorMessage = document.querySelector(".error-message") as HTMLElement;

//? Types | Interface
type UserInfo = {
  id: string;
  avatar_url: string;
  url: string;
  login: string;
};

//? Helper Function | Reusable Functions
async function useFetchHook<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Error in fetch users data - ${res.status}`);
  const resJson = await res.json();
  return resJson;
}

function throttle(func: Function, delay: number) {
  let lastCall: number = 0;
  return function (this: unknown, ...args: unknown[]) {
    const now: number = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

//? Init Function
(async function () {
  useFetchHook<UserInfo[]>("https://api.github.com/users", {}).then(
    (usersInfo) => {
      let html =
        '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-10 mx-5 sm:mx-0 mt-10">';
      usersInfo.forEach((userInfo) => {
        html += `
        <div class="result-card max-w-lg w-full mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg" data-id=${userInfo.id}>
            <div class="px-4 py-6">
                <div class="text-center my-4">
                    <img class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                        src="${userInfo.avatar_url}" alt="">
                    <div class="py-2 flex flex-col gap-2">
                        <h3 class="user-name font-bold text-2xl text-gray-800 dark:text-white">${userInfo.login}</h3>
                    </div>
                </div>
            </div>
        </div>`;
      });
      html += "</div>";

      resultContainer.innerHTML = html;
      resultCards = resultContainer.querySelectorAll(".result-card");
    }
  );

  //?  Search Function
  searchInput.addEventListener("input", () => {
    if (resultCards.length === 0) return;
    let count = 0;
    resultCards.forEach((resultCard) => {
      const userName = resultCard
        .querySelector(".user-name")
        ?.textContent?.trim()
        .toLowerCase();
      if (userName?.includes(searchInput.value.trim().toLowerCase())) {
        resultCard.style.display = "block";
        count++;
      } else {
        resultCard.style.display = "none";
      }
    });
    count === 0
      ? (errorMessage.style.display = "block")
      : (errorMessage.style.display = "none");
  });
})();
