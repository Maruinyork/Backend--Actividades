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

        //
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

            $('#compresion').text(` Porcentaje de compresión: ${Math.floor(compresion)}%`)

            $('#chat-messages').empty()
            chat["messages"].map( (message) => {
                $('#chat-messages').append($('<li>').html(`<span style="color: black">
                    <img src=${message["author"].avatar || "https://i.postimg.cc/0jJv01jY/nouser.png"} style="width:25px;height:25px;border-radius:50%">
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
    $('#chat-messages').append($('<li>').html(`<span style="color: black">
    <img src=${message["author"].avatar || "https://i.postimg.cc/0jJv01jY/nouser.png"} style="width:25px;height:25px;border-radius:50%">
    ${message["author"].alias}: 
    <b>${message["text"]}</b>
    </span>`))
})