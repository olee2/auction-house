export const createProfile = (profile, error = false) => {
  const { name, avatar, credits, wins } = profile;

  return `
            <img
              src=${avatar ? avatar : '../assets/img/avatar_placeholder.png'}
              class="align-self-center img-thumbnail mb-3 rounded-circle profile-image"
              onerror="this.src='./assets/img/avatar_placeholder.png'" 
              alt=""
            />
            <a class="a edit-avatar-open mb-2">Edit Avatar</a>
            <h1 class="h2 w-100 text-center">${name}</h1>
            <div class="d-flex  align-items-start justify-content-between w-100 border p-3 mt-4">
              <p>Available Credits: $${credits}</p>
              <p>Auctions won: ${wins.length}</p>
            </div>
            
            `;
};
