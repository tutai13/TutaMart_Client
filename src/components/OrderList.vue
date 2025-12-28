<template>
  <div class="container-fluid py-3 px-3 px-lg-4" style="font-size: 0.875rem">
    <!-- Page Title & Actions -->
    <div class="row g-3 mb-4 align-items-center">
      <div class="col-12 col-lg-7">
        <h3 class="fw-bold mb-1">Order History</h3>
        <p class="text-muted small mb-0">
          Manage and track all customer orders, payments, and fulfillments.
        </p>
      </div>
      <div class="col-12 col-lg-5 text-lg-end">
        <div class="d-flex gap-2 justify-content-lg-end">
          <button class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-file-earmark-arrow-down me-1"></i> Export
          </button>
          <button class="btn btn-success btn-sm fw-bold">
            <i class="bi bi-plus-lg me-1"></i> New Order
          </button>
        </div>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body p-3">
        <div class="row g-3 align-items-center">
          <!-- Search -->
          <div class="col-12 col-lg-4">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-end-0">
                <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                class="form-control border-start-0 ps-0 small"
                placeholder="Search by Order ID or Customer Name"
              />
            </div>
          </div>

          <!-- Date Range -->
          <div class="col-12 col-lg-4">
            <div class="row g-2">
              <div class="col-6">
                <input type="date" class="form-control form-control-sm small" />
              </div>
              <div class="col-6">
                <input type="date" class="form-control form-control-sm small" />
              </div>
            </div>
          </div>

          <!-- Status & Sort -->
          <div class="col-12 col-lg-4">
            <div class="d-flex flex-wrap gap-2 justify-content-lg-end">
              <button class="btn btn-outline-secondary btn-sm small">
                Status: All <i class="bi bi-chevron-down ms-1"></i>
              </button>
              <button class="btn btn-outline-secondary btn-sm small">
                Payment: All <i class="bi bi-chevron-down ms-1"></i>
              </button>
              <button class="btn btn-outline-secondary btn-sm small">
                Sort: Newest <i class="bi bi-sort-down ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="card border-0 shadow-sm">
      <div class="table-responsive">
        <table class="table table-hover mb-0 align-middle small">
          <thead class="bg-light">
            <tr>
              <th class="text-uppercase text-muted small ps-4">Order ID</th>
              <th class="text-uppercase text-muted small">Date & Time</th>
              <th class="text-uppercase text-muted small">Customer</th>
              <th class="text-uppercase text-muted small text-end">
                Total Amount
              </th>
              <th class="text-uppercase text-muted small">Payment Status</th>
              <th class="text-uppercase text-muted small text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id" class="hover-bg-light">
              <td class="ps-4 py-3 fw-bold">{{ order.id }}</td>
              <td class="py-3">
                <div>{{ order.date }}</div>
                <small class="text-muted">{{ order.time }}</small>
              </td>
              <td class="py-3">
                <div class="d-flex align-items-center gap-2">
                  <div
                    class="bg-secondary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center text-xs fw-bold"
                    style="width: 32px; height: 32px"
                  >
                    {{ order.customerInitials }}
                  </div>
                  <span>{{ order.customer }}</span>
                </div>
              </td>
              <td class="py-3 text-end fw-bold">{{ order.amount }}</td>
              <td class="py-3">
                <span class="badge" :class="order.statusClass">
                  <span
                    class="rounded-circle me-1"
                    style="width: 8px; height: 8px; display: inline-block"
                    :class="order.statusDot"
                  ></span>
                  {{ order.status }}
                </span>
              </td>
              <td class="py-3 text-center">
                <button class="btn btn-link text-success small fw-medium p-0">
                  View Details <i class="bi bi-arrow-right ms-1"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="card-footer bg-transparent border-top d-flex flex-column flex-sm-row justify-content-between align-items-center py-3 px-4 gap-3"
      >
        <small class="text-muted">
          Showing <strong>1</strong> to <strong>5</strong> of
          <strong>50</strong> entries
        </small>
        <nav aria-label="Page navigation">
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item disabled">
              <a class="page-link" href="#"
                ><i class="bi bi-chevron-left"></i
              ></a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item disabled">
              <span class="page-link">...</span>
            </li>
            <li class="page-item"><a class="page-link" href="#">10</a></li>
            <li class="page-item">
              <a class="page-link" href="#"
                ><i class="bi bi-chevron-right"></i
              ></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
const orders = [
  {
    id: "#ORD-7352",
    date: "Oct 24, 2023",
    time: "02:30 PM",
    customer: "Alice Johnson",
    customerInitials: "AJ",
    amount: "$45.20",
    status: "Paid",
    statusClass: "bg-success bg-opacity-10 text-success",
    statusDot: "bg-success",
  },
  {
    id: "#ORD-7351",
    date: "Oct 24, 2023",
    time: "01:15 PM",
    customer: "Walk-in Customer",
    customerInitials: "",
    amount: "$12.50",
    status: "Pending",
    statusClass: "bg-warning bg-opacity-10 text-warning",
    statusDot: "bg-warning",
  },
  {
    id: "#ORD-7350",
    date: "Oct 23, 2023",
    time: "11:45 AM",
    customer: "Michael K.",
    customerInitials: "MK",
    amount: "$120.00",
    status: "Paid",
    statusClass: "bg-success bg-opacity-10 text-success",
    statusDot: "bg-success",
  },
  {
    id: "#ORD-7349",
    date: "Oct 23, 2023",
    time: "09:10 AM",
    customer: "Sarah Lee",
    customerInitials: "SL",
    amount: "$8.50",
    status: "Failed",
    statusClass: "bg-danger bg-opacity-10 text-danger",
    statusDot: "bg-danger",
  },
  {
    id: "#ORD-7348",
    date: "Oct 22, 2023",
    time: "05:45 PM",
    customer: "John Doe",
    customerInitials: "JD",
    amount: "$210.00",
    status: "Paid",
    statusClass: "bg-success bg-opacity-10 text-success",
    statusDot: "bg-success",
  },
];
</script>

<style scoped>
.hover-bg-light:hover {
  background-color: rgba(0, 255, 0, 0.03);
}
.card {
  transition: all 0.2s ease;
}
.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
</style>
