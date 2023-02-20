export function getUserFromLocalStorage(key: string) {
	const itemStr= localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) return null

	const item = JSON.parse(itemStr)
	const now = new Date().getTime()
	// compare the expiry time of the item with the current time
	if (now > item.expiry) {
		localStorage.removeItem(key)
		return null
	}
    //renew expiry
    const newItem = {...item, expiry: now + 2.592e+9};
    localStorage.setItem("user", JSON.stringify(newItem))

	return newItem
}
