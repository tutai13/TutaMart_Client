<template>
  <div class="container-fluid py-3 px-3 px-lg-4" style="font-size: 0.875rem">
    <!-- Page Title & Stats -->
    <div class="row g-3 mb-4 align-items-center">
      <div class="col-12 col-lg-6">
        <nav aria-label="breadcrumb" class="small text-muted mb-2">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="#" class="text-decoration-none">Pages</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Kho hàng</li>
          </ol>
        </nav>
        <h3 class="fw-bold mb-1">Inventory Overview</h3>
        <p class="text-muted small mb-0">
          Manage stock levels, prices and product details.
        </p>
      </div>

      <div class="col-12 col-lg-6">
        <div class="row g-3">
          <div class="col-12 col-sm-6">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-body py-3 px-4">
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-currency-dollar text-success me-2"></i>
                  <small class="text-muted text-uppercase">Total Value</small>
                </div>
                <h5 class="fw-bold mb-0">$45,230.00</h5>
                <small class="text-success small">+12% from last month</small>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6">
            <div
              class="card border-0 shadow-sm h-100 border-start border-danger border-3"
            >
              <div class="card-body py-3 px-4">
                <div class="d-flex align-items-center mb-2">
                  <i class="bi bi-exclamation-triangle text-danger me-2"></i>
                  <small class="text-muted text-uppercase"
                    >Low Stock Items</small
                  >
                </div>
                <h5 class="fw-bold mb-0 text-danger">5</h5>
                <small class="text-danger small"
                  >Needs immediate attention</small
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search & Filters -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body p-3">
        <div class="row g-3 align-items-center">
          <div class="col-12 col-lg-5">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-end-0">
                <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                class="form-control border-start-0 ps-0 small"
                placeholder="Search products by name, SKU or brand..."
              />
            </div>
          </div>

          <div class="col-12 col-lg-7">
            <div
              class="d-flex flex-wrap gap-2 justify-content-lg-end align-items-center"
            >
              <select class="form-select form-select-sm w-auto small">
                <option>Category: All</option>
              </select>
              <select class="form-select form-select-sm w-auto small">
                <option>Supplier: All</option>
              </select>
              <div class="vr mx-2 d-none d-sm-block"></div>
              <button class="btn btn-outline-secondary btn-sm">
                <i class="bi bi-upload me-1"></i> Import Excel
              </button>
              <!-- Nút mở modal Add Product -->
              <button
                class="btn btn-success btn-sm fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#addProductModal"
              >
                <i class="bi bi-plus-lg me-1"></i> Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="card border-0 shadow-sm">
      <div class="table-responsive">
        <table class="table table-hover mb-0 align-middle small">
          <thead class="bg-light">
            <tr>
              <th class="text-uppercase text-muted small ps-4">Image</th>
              <th class="text-uppercase text-muted small">Product Info</th>
              <th class="text-uppercase text-muted small">Category</th>
              <th class="text-uppercase text-muted small text-end">Qty</th>
              <th class="text-uppercase text-muted small text-end">
                Cost / Sell
              </th>
              <th class="text-uppercase text-muted small">Supplier</th>
              <th class="text-uppercase text-muted small text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Giữ nguyên phần tbody như trước -->
            <tr
              v-for="product in products"
              :key="product.sku"
              class="hover-bg-light"
            >
              <td class="ps-4 py-3">
                <img
                  :src="product.image"
                  class="rounded"
                  width="48"
                  height="48"
                  :alt="product.name"
                />
              </td>
              <td class="py-3">
                <div class="fw-bold">{{ product.name }}</div>
                <small class="text-muted">{{ product.sku }}</small>
              </td>
              <td class="py-3">
                <span class="badge" :class="product.categoryClass">{{
                  product.category
                }}</span>
              </td>
              <td class="py-3 text-end">
                <div
                  v-if="product.lowStock"
                  class="d-flex flex-column align-items-end"
                >
                  <span class="fw-bold text-danger">{{ product.qty }}</span>
                  <span
                    class="badge bg-danger bg-opacity-10 text-danger small mt-1"
                    >Low Stock</span
                  >
                </div>
                <span v-else class="fw-bold">{{ product.qty }}</span>
              </td>
              <td class="py-3 text-end">
                <div class="fw-bold">{{ product.sellPrice }}</div>
                <small class="text-muted">Cost: {{ product.costPrice }}</small>
              </td>
              <td class="py-3">
                <div class="d-flex align-items-center gap-2">
                  <div
                    class="bg-secondary bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center text-xs fw-bold"
                    style="width: 24px; height: 24px"
                  >
                    {{ product.supplierInitials }}
                  </div>
                  <span class="small">{{ product.supplier }}</span>
                </div>
              </td>
              <td class="py-3 text-center">
                <button class="btn btn-link text-success p-1" title="Edit">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-link text-danger p-1" title="Delete">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="card-footer bg-transparent border-top d-flex justify-content-between align-items-center py-3 px-4"
      >
        <small class="text-muted">
          Showing <strong>1</strong> to <strong>5</strong> of
          <strong>48</strong> results
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
            <li class="page-item"><a class="page-link" href="#">8</a></li>
            <li class="page-item">
              <a class="page-link" href="#"
                ><i class="bi bi-chevron-right"></i
              ></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Modal Add Product -->
    <div
      class="modal fade"
      id="addProductModal"
      tabindex="-1"
      aria-labelledby="addProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title fw-bold" id="addProductModalLabel">
              Add New Product
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row g-3">
                <!-- Upload Image -->
                <div class="col-12 col-md-4">
                  <div
                    class="border border-dashed border-secondary rounded-3 p-5 text-center hover-border-primary cursor-pointer"
                  >
                    <i class="bi bi-cloud-upload text-muted fs-1 mb-3"></i>
                    <p class="small text-muted mb-1">
                      <strong>Click to upload</strong> or drag and drop
                    </p>
                    <p class="small text-muted">SVG, PNG, JPG or GIF</p>
                  </div>
                </div>

                <!-- Form Fields -->
                <div class="col-12 col-md-8">
                  <div class="row g-3">
                    <div class="col-12">
                      <label class="form-label small fw-medium"
                        >Product Name</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        placeholder="e.g. Premium Green Tea"
                      />
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-medium">SKU</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="e.g. GT-500"
                      />
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-medium">Category</label>
                      <select class="form-select">
                        <option selected disabled>Select category</option>
                        <option>Beverages</option>
                        <option>Snacks</option>
                        <option>Household</option>
                        <option>Dairy</option>
                        <option>Bakery</option>
                      </select>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-medium"
                        >Cost Price</label
                      >
                      <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-medium"
                        >Selling Price</label
                      >
                      <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-medium"
                        >Initial Quantity</label
                      >
                      <input
                        type="number"
                        class="form-control"
                        placeholder="0"
                        min="0"
                      />
                    </div>
                    <div class="col-12 col-md-6">
                      <label class="form-label small fw-medium">Supplier</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="e.g. Tea Suppliers Inc."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-success fw-bold">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const products = [
  {
    sku: "BEV-001",
    name: "Coca Cola 1.5L",
    category: "Beverages",
    categoryClass: "bg-primary bg-opacity-10 text-primary",
    qty: 8,
    lowStock: true,
    costPrice: "$1.20",
    sellPrice: "$2.50",
    supplier: "Coca-Cola Co.",
    supplierInitials: "CC",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDya4qxpEnqytlKuHz67j8FmmSDaj_DGowQrkXKlvPxMj-KA0duX7LXu-F1-lBD4V-PL_jowkTAmEL5THtKksi2Po4j2dnt0ulCkqS2WwPSi0a0-1-A2qTwvRY0wiZcOEyd9NrA4hK-QfFrTQ4yD78QyAo2tTg-VgwLq7yTM6vMLUw8AwyoFe2FU0iAzmGhwsgF5RzRJx9kklMXzEAEnJwdaIElK9r0zKvaIF5Jq3pjZf7n3TCYePDPgl-1Allm0pL-K0CODOFF5YLb",
  },
  {
    sku: "SNK-204",
    name: "Lays Classic Chips",
    category: "Snacks",
    categoryClass: "bg-warning bg-opacity-10 text-warning",
    qty: 45,
    costPrice: "$0.90",
    sellPrice: "$1.80",
    supplier: "PepsiCo Ltd.",
    supplierInitials: "PL",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCArqGBAi7vWPzuCef7v9nzZU9YEZLF11U-jgh1WfWjiD2uLkj3Qg2fj7JxcF7MEsRMNLzVl5ECTQpDMstO8BFZQbygg3uMV--VvjgB9MDzcfm7UHNmOC6mo8St-UhGJYS1z0wNskuA9S0QoJJELSA7-8bQy5lheCDRiH404zNMBiaO6OJ3Tt8078ZFqwRsM7xhluougiiKdPQMlsZeWtLcRMwc8Gybd-i1Y1GT-d_uO3V4U3S_HFTJt5aXNMa4Y_W0Rh7evI26pTkO",
  },
  {
    sku: "HOU-552",
    name: "CleanX Detergent",
    category: "Household",
    categoryClass: "bg-purple bg-opacity-10 text-purple",
    qty: 3,
    lowStock: true,
    costPrice: "$8.00",
    sellPrice: "$12.50",
    supplier: "P&G Wholesale",
    supplierInitials: "PG",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAIZ6pon51orU08Qv4MRhLF1kmyRym-_ykLp9KDu0LnOZtMvFeVLcC2Mp0H3P6h-p2gY_eza39hMp7EEQD9xZV6Q_uh7upFs6LC80mUdwqzLWxOpSKoCyLjUhss-8yjR0Q0Ue4OTZOFbpAWBEKlDcUGmRzCGlDCcGwomviIjGEzDhnrTnG0ObLlFH_b76ub6GGTrR3LYSYqLPfNnFPG0M6kzjSxlR3oOT98SdwmhRJ2fDdaBgHR6RjmBRrJwCrPrBo-sJyNdVtuZQAE",
  },
  {
    sku: "DAI-101",
    name: "Farm Fresh Milk 1L",
    category: "Dairy",
    categoryClass: "bg-info bg-opacity-10 text-info",
    qty: 22,
    costPrice: "$2.10",
    sellPrice: "$3.20",
    supplier: "Farm Fresh Ltd.",
    supplierInitials: "FF",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjAfM3aORjd5ed1EHOCQ4UYuIF_aPHJPNCFu829YohyaijxM8zBA7YHAXSM4HfhoUpEMX_P5Jj96Kvx4MPuWhpei8YdA20TQ3KNLxzYio6tMmKqKR3yfw75g0CGJaCM2iOLucjpoHZw0WZIj9kdAiecvsM7x1PFgPkVyhxReimnLr5z7gTLSyjCMs4XGHKCjmNvbqF-_CTXsDdEAAQcuQqhj5utt1w6FMEHw4ItBGhwbZL0sKzz3JRJpPEJSneTmynxRfarcY16dZ6",
  },
  {
    sku: "BAK-099",
    name: "Whole Wheat Bread",
    category: "Bakery",
    categoryClass: "bg-orange bg-opacity-10 text-orange",
    qty: 14,
    costPrice: "$2.50",
    sellPrice: "$4.50",
    supplier: "Sunshine Bakery",
    supplierInitials: "SB",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCg8mE8hCnrWPv7ACjgB3R5cAwBfL7XmC60Lr5HLQ7WoX0dherL6E6NQ-X_n2nnRgV7l_5e8CYkkgRTCEdaSP6fTD-Zo4Br4N6O1OC_KWVggR4DSwENpzc0q0zlqFUdzwgMXXGyT8urFrj0hAv8SbeC8tbdu7G0qJdE5e36BRjGUGg8bOAdqQFCO9yABNQQ9RzuqQ0N7a-LcMXxpoLhYmEuHVU9EGkH_NhdQY_TcCPC14XPIRXmSQUddRn3tzkSyBpuvUHww1CZb6V8",
  },
];
</script>

<style scoped>
.hover-bg-light:hover {
  background-color: rgba(0, 255, 0, 0.03);
}
.hover-border-primary:hover {
  border-color: #198754 !important;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
