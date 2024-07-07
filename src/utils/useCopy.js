export default function useCopy() {
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('URL copied to clipboard!')
      })
      .catch((error) => {
        alert('Failed to copy URL!')
      })
  }

  return {
    copyToClipboard
  }
}
