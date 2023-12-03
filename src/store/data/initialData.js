export const initialData = {
  user: {
    isLoggedIn: false,
    data: JSON.parse(localStorage.getItem('user')) || undefined,
  },
  agents: JSON.parse(localStorage.getItem('agents')) || undefined,
  footballers: JSON.parse(localStorage.getItem('footballers')) || undefined,
};
