/**
 * Created by Adrian on 12/18/2016.
 */
var stdin = process.openStdin();
export async function read() {
    return new Promise((resolve:any, reject: any) => {
        stdin.addListener("data", function(d) {
            resolve(d.toString().trim());
        });
    })
}