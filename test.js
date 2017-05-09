/**
 * e-mail client. We have a folder with emails, where each email has a message ID and possibly a replyTo
 * Write an algorithm that lists the email as threads, e.g.
 *
 * parendId -> ID
 * children:
 *  messageID
 *  messageID
 */

var msgs = [
    {
        id: "A",
        replyTo: "B"
    },
    {
        id: "C",
        replyTo: "A"
    },
    {
        id: "B",
    },

    {
        id: "G",
        replyTo: "X"
    },
    {
        id: "X",
        replyTo: "W"
    },
    {
        id: "W",
    }
];

const threads = [];

const parentMap = msgs.map((message) => {
    const thread = {};
    if (!message.replyTo) {
        thread.id = message.id;
        thread.children = [];
        threads.push(thread);
    }
});

const childMap = msgs.map((message) => {
    return threads.map((thread) => {
        if (message.replyTo === thread.id) {
            thread.children.push(message.id);
        }
    })
});

console.log(threads);

// var result = [
//     {
//         id: "B",
//         children: ["A", "C" ]
//     },
//     {
//         id: "W",
//         children: ["G", "X"]
//     }
// ];
