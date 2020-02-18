

export default function logout() {
  try {
    localStorage.removeItem('user');
  } catch (error) {
    console.log('ERRRORRRR', error.message);
  }
}
