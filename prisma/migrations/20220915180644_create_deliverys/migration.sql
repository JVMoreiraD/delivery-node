-- CreateTable
CREATE TABLE "Deliverys" (
    "id" TEXT NOT NULL,
    "id_client" TEXT NOT NULL,
    "id_deliveryman" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientsId" TEXT NOT NULL,
    "deliverymanId" TEXT NOT NULL,

    CONSTRAINT "Deliverys_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deliverys" ADD CONSTRAINT "Deliverys_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliverys" ADD CONSTRAINT "Deliverys_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliveryman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
