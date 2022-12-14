export const createProfile = (profile) => {
  const { name, avatar, credits } = profile;

  return `
            <img
              src=${avatar ? avatar : '../assets/img/man.svg'}
              class="align-self-center img-thumbnail mb-3 rounded-circle profile-image"
              alt=""
            />
            <h1 class="h1 w-100 text-center">${name}</h1>
            <div class="d-flex align-items-center justify-content-between w-100 border shadow-sm p-3 mt-4">
              <p>Available Credits: $${credits}</p>
              <button class="btn btn-secondary">New Listing</button>
            </div>
            
            `;
};
