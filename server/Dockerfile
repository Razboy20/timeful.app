# Build stage
FROM golang:1.20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Generate swagger docs (if swag is used)
RUN go install github.com/swaggo/swag/cmd/swag@latest
RUN swag init -g main.go -o docs || true

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -buildvcs=false -o server .

# Runtime stage
FROM alpine:3.19

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache ca-certificates tzdata

# Create non-root user
RUN adduser -D -g '' appuser

# Copy binary from builder
COPY --from=builder /app/server .

# Create logs directory
RUN mkdir -p /app/logs && chown -R appuser:appuser /app

USER appuser

EXPOSE 3002

# Run in release mode
CMD ["./server", "-release=true"]
