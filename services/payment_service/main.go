package main

import (
    "encoding/json"
    "log"
    "net/http"

    "github.com/streadway/amqp"
)

func main() {
    conn, err := amqp.Dial("amqp://localhost")
    if err != nil {
        log.Fatal(err)
    }
    ch, err := conn.Channel()
    if err != nil {
        log.Fatal(err)
    }
    err = ch.ExchangeDeclare(
        "events",
        "topic",
        false,
        false,
        false,
        false,
        nil,
    )
    if err != nil {
        log.Fatal(err)
    }

    http.HandleFunc("/payments", func(w http.ResponseWriter, r *http.Request) {
        var payment map[string]interface{}
        json.NewDecoder(r.Body).Decode(&payment)
        // Lógica de procesamiento de pago
        event := map[string]interface{}{"type": "PaymentCompleted", "data": payment}
        body, _ := json.Marshal(event)
        ch.Publish("events", "payment.completed", false, false, amqp.Publishing{Body: body})
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(payment)
    })

    log.Println("Payment Service running on port 3004")
    http.ListenAndServe(":3004", nil)
}
