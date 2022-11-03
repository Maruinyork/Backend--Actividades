//Normalizr

const socket = io();
const { denormalize, schema} = normalizr

socket.on('connection', (data) => {

    switch (Object.keys(data).toString()) {
        
        case "products":
            $('#cardRow').empty()
            data["products"].map( (product) => {
                $('#cardRow').append(`

                    <div class="card">
                        <img src=${product["thumbnail"] || "https://www.bicifan.uy/wp-content/uploads/2016/09/producto-sin-imagen.png"} style="width:100%">
                        <h2>${product["title"]}</h2>
                        <h3 class="price">${"$" + product["price"]}</h3>
                    </div>
                `)
            })
            break;

        case "chat":

            const authorSchema = new schema.Entity('authors')

            const messageSchema = new schema.Entity('messages', {
                author: authorSchema,
            })
    
            const chatSchema = new schema.Entity('chat', {
                messages: [messageSchema]
            })

            const chat = denormalize(data.chat['result'], chatSchema, data.chat['entities'])
        
            $('#chat-messages').empty()
            
            const compresion = (1 - (JSON.stringify(chat).length / JSON.stringify(data['chat']).length)) * 100

            $('#compresion').text(`Porcentaje de compresión: ${Math.floor(compresion)}%`)

            $('#chat-messages').empty()
            chat["messages"].map( (message) => {
                $('#chat-messages').append($('<li>').html(`<span style="color:black">
                    <img src=${message["author"].avatar || "data:image/jpeg;base64,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"} style="width:25px;height:25px;border-radius:50%">
                    ${message["author"].alias}: 
                    <b>${message["text"]}</b>
                    </span>`))
            })
            break;
    }

})


//////////////////////////////////////////////////////

$("#productForm").submit( () => {
    const title = $('#title').val()
    const thumbnail = $('#thumbnail').val()
    const detail = $('#detail').val()
    const price = $('#price').val()
    const stock = $('#stock').val()

    socket.emit('postProduct', {"title": title, "thumbnail": thumbnail, "detail": detail, "price": parseInt(price), "stock": parseInt(stock)})

    $('#title').val('')
    $('#thumbnail').val('')
    $('#detail').val('')
    $('#price').val('')
    $('#stock').val('')

    return false; 
})

socket.on('postProduct', function(product) {
    $('#cardRow').append(`
        <div class="card">
            <img src=${product["thumbnail"] || "https://www.bicifan.uy/wp-content/uploads/2016/09/producto-sin-imagen.png"} style="width:100%">
            <h2>${product["title"]}</h2>
            <h3 class="price">${"$" + product["price"]}</h3>
        </div>
    `)
})


//////////////////////////////////////////////////////

$("#chat").submit( () => {
    const name = $('#name').val()
    const lastname = $('#lastname').val()
    const age = $('#age').val()
    const alias = $('#alias').val()
    const avatar = $('#avatar').val()
    const email = $('#email').val()
    const text = $('#message').val()

    socket.emit('chatter', {text:text, author:{
        name: name,
        lastname: lastname,
        age: parseInt(age),
        alias: alias,
        avatar: avatar,
        id: email
    }})

    $('#message').val('')

    return false; 
})

socket.on('chatter', function(message) {
    $('#chat-messages').append($('<li>').html(`<span style="color:black">
    <img src=${message["author"].avatar || "data:image/jpeg;base64,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"} style="width:25px;height:25px;border-radius:50%">
    ${message["author"].alias}: 
    <b>${message["text"]}</b>
    </span>`))
})