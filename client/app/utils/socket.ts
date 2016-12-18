export function subscribeFor(socket: any, action: string) {
    socket.on(action, (response: string) => {
        console.log(response);
    })
}