# vehicle_service_vehicle

model Vehicle {
  id String @id @default(uuid())
  make String
  model String
  year Int
  vin String @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  owner User @relation(fields:[ownerId], references: [id], onDelete: Cascade)
  ownerId String
  notifications Notification[]
}

model Notification {
  id String @id @default(uuid())
  tittle String
  type NotificationType @default(SYSTEM)
  isRead Boolean @default(false)
  message String
  userId String
  vehicleId String
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  vehicle Vehicle @relation(fields: [vehicleId], references: [id], onDelete: Cascade)
}

enum NotificationType {
  MAINTENANCE 
  FINE        
  GENERAL     
  SYSTEM      
}
