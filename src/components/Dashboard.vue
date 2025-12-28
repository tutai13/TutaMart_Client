<template>
  <div class="container-fluid py-3 px-3 px-lg-4" style="font-size: 0.875rem">
    <!-- Title & Actions -->
    <div class="row g-3 mb-4 align-items-center">
      <div class="col-12 col-sm-8">
        <h4 class="fw-bold mb-1">Dashboard Overview</h4>
        <small class="text-muted"
          >Welcome back, here's what's happening today.</small
        >
      </div>
      <div class="col-12 col-sm-4 text-sm-end">
        <div class="d-flex gap-2 justify-content-sm-end">
          <button class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-cloud-download me-1"></i> Export
          </button>
          <button class="btn btn-success btn-sm fw-bold">
            <i class="bi bi-plus-lg me-1"></i> Add Product
          </button>
        </div>
      </div>
    </div>

    <!-- KPI Cards - nhỏ gọn hơn -->
    <div class="row g-3 mb-4">
      <!-- 1. Doanh thu hôm nay -->
      <div class="col-12 col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body py-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="bg-success bg-opacity-10 text-success rounded-2 p-2">
                <i class="bi bi-currency-dollar"></i>
              </div>
              <span class="badge bg-success bg-opacity-10 text-success small"
                >+12%</span
              >
            </div>
            <small class="text-muted d-block mb-1">Doanh thu hôm nay</small>
            <h5 class="fw-bold mb-0">5.2M ₫</h5>
            <small class="text-muted">so với hôm qua</small>
          </div>
        </div>
      </div>

      <!-- 2. Đơn hàng -->
      <div class="col-12 col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body py-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="bg-info bg-opacity-10 text-info rounded-2 p-2">
                <i class="bi bi-cart-check"></i>
              </div>
              <span class="badge bg-info bg-opacity-10 text-info small"
                >+8%</span
              >
            </div>
            <small class="text-muted d-block mb-1">Đơn hàng hôm nay</small>
            <h5 class="fw-bold mb-0">268</h5>
            <small class="text-muted">đơn hàng</small>
          </div>
        </div>
      </div>

      <!-- 3. Số sản phẩm bán ra (tổng số lượng sản phẩm đã bán) -->
      <div class="col-12 col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body py-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="bg-primary bg-opacity-10 text-primary rounded-2 p-2">
                <i class="bi bi-box-seam"></i>
              </div>
              <span class="badge bg-primary bg-opacity-10 text-primary small"
                >+15%</span
              >
            </div>
            <small class="text-muted d-block mb-1">Số sản phẩm bán ra</small>
            <h5 class="fw-bold mb-0">1.248</h5>
            <small class="text-muted">sản phẩm hôm nay</small>
          </div>
        </div>
      </div>

      <!-- 4. Cảnh báo tồn kho -->
      <div class="col-12 col-md-3">
        <div class="card border-0 shadow-sm border-warning border-opacity-50">
          <div class="card-body py-3">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div class="bg-warning bg-opacity-10 text-warning rounded-2 p-2">
                <i class="bi bi-exclamation-triangle"></i>
              </div>
              <span class="badge bg-warning bg-opacity-10 text-warning small"
                >Cần xử lý</span
              >
            </div>
            <small class="text-muted d-block mb-1">Cảnh báo tồn kho</small>
            <h5 class="fw-bold mb-0">3 sản phẩm</h5>
            <small class="text-warning fw-medium"
              >Sắp hết hàng - cần nhập thêm</small
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="row g-3 mb-4">
      <!-- Weekly Revenue -->
      <div class="col-12 col-lg-8">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 class="fw-bold mb-1">Weekly Revenue</h6>
                <div class="d-flex align-items-center gap-2">
                  <span class="h5 fw-bold mb-0">32.5M ₫</span>
                  <span
                    class="badge bg-success bg-opacity-10 text-success small"
                    >+5.2%</span
                  >
                </div>
              </div>
              <select class="form-select form-select-sm w-auto small">
                <option>Last 7 Days</option>
              </select>
            </div>

            <div style="height: 200px" class="position-relative">
              <svg
                class="w-100 h-100"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="gradSmall"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stop-color="#47c250" stop-opacity="0.2" />
                    <stop offset="100%" stop-color="#47c250" stop-opacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,100 L0,60 C10,60 10,40 20,45 C30,50 30,30 40,25 C50,20 50,40 60,35 C70,30 70,10 80,15 C90,20 90,45 100,40 L100,100 Z"
                  fill="url(#gradSmall)"
                />
                <path
                  d="M0,60 C10,60 10,40 20,45 C30,50 30,30 40,25 C50,20 50,40 60,35 C70,30 70,10 80,15 C90,20 90,45 100,40"
                  fill="none"
                  stroke="#47c250"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <div class="d-flex justify-content-between text-muted small mt-2">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span
              ><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sales by Category -->
      <div class="col-12 col-lg-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body p-3 d-flex flex-column">
            <h6 class="fw-bold mb-3">Sales by Category</h6>
            <div
              class="flex-grow-1 d-flex flex-column justify-content-center align-items-center"
            >
              <div
                class="position-relative"
                style="width: 140px; height: 140px"
              >
                <div
                  class="position-absolute inset-0 rounded-circle"
                  style="
                    background: conic-gradient(
                      #47c250 0% 45%,
                      #ff9800 45% 70%,
                      #2196f3 70% 85%,
                      #e0e0e0 85% 100%
                    );
                  "
                ></div>
                <div
                  class="position-absolute inset-3 bg-white rounded-circle d-flex flex-column align-items-center justify-content-center shadow-sm"
                >
                  <small class="text-muted">Total</small>
                  <h5 class="fw-bold mb-0">1,240</h5>
                  <small class="text-muted">Items</small>
                </div>
              </div>
            </div>

            <div class="mt-3 small text-muted">
              <div class="d-flex align-items-center gap-2 mb-1">
                <div
                  class="bg-success rounded-circle"
                  style="width: 10px; height: 10px"
                ></div>
                Produce (45%)
              </div>
              <div class="d-flex align-items-center gap-2 mb-1">
                <div
                  class="bg-warning rounded-circle"
                  style="width: 10px; height: 10px"
                ></div>
                Snacks (25%)
              </div>
              <div class="d-flex align-items-center gap-2 mb-1">
                <div
                  class="bg-primary rounded-circle"
                  style="width: 10px; height: 10px"
                ></div>
                Drinks (15%)
              </div>
              <div class="d-flex align-items-center gap-2">
                <div
                  class="bg-secondary bg-opacity-25 rounded-circle"
                  style="width: 10px; height: 10px"
                ></div>
                Others (15%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="card border-0 shadow-sm">
      <div
        class="card-header bg-transparent border-bottom py-2 d-flex justify-content-between align-items-center"
      >
        <h6 class="fw-bold mb-0">Recent Transactions</h6>
        <a href="#" class="text-success small fw-bold">View All →</a>
      </div>
      <div class="table-responsive">
        <table class="table table-sm table-hover mb-0 small align-middle">
          <thead class="bg-light">
            <tr>
              <th class="text-uppercase text-muted small">Order ID</th>
              <th class="text-uppercase text-muted small">Product</th>
              <th class="text-uppercase text-muted small">Date</th>
              <th class="text-uppercase text-muted small">Amount</th>
              <th class="text-uppercase text-muted small">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="fw-medium small">#ORD-00921</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC73ZVjPZlUQxwraSkOOf0ZDWY5xJUta-faa0pL1p1b1s7m5ysCcExiMA1b-Ldhoic4Xl7t7frx_-txqB20r9xYAVZE4b6LU-Ppaea0yu0bTyeW4wgxrmJlFYSRFDwmPJxumV7ec8l-y0RwyUvno8G0P7aCUpS41vbQg0dxiJQboKWOLglQLs1_SsziDIIiRJvX7S7XgdTYxJgP3yE1etaf5Ula49fe98auccP_OF4gHH7StooVq0Cw53NlfxW5ai2wlSviJmOTsLS6"
                    class="rounded"
                    width="32"
                    height="32"
                    alt=""
                  />
                  <span class="small">Fresh Apples 1kg</span>
                </div>
              </td>
              <td class="text-muted small">Oct 24</td>
              <td class="fw-bold small">45,000 ₫</td>
              <td>
                <span class="badge bg-success bg-opacity-10 text-success small"
                  >Completed</span
                >
              </td>
            </tr>
            <tr>
              <td class="fw-medium small">#ORD-00920</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqorxHmVNauV60fZCmYal6gQsdUfkpL9VRJwubTqABx3MH0pYIC_jG-pB_ixpOkW1umd2PPFnkyIhSXUcm2eQ5kBa_OaX2vDSgXaKX2DX0ZOa_SpvKA32lwYJ-QNvwvJXLItFbDcm3O1GC8bjYeTF5WxnboSsueQkUqQo-Q_-p-gKEvxwo56Muf32UFkuT1X6dXf5z8M-j9HxgdCbPRL7hr2ppjeMiQtnl_HopQWYxnMKjn3pKvl9UIR7Rygb2ThAIGvrjskjut7Y4"
                    class="rounded"
                    width="32"
                    height="32"
                    alt=""
                  />
                  <span class="small">Orange Juice</span>
                </div>
              </td>
              <td class="text-muted small">Oct 24</td>
              <td class="fw-bold small">22,000 ₫</td>
              <td>
                <span class="badge bg-success bg-opacity-10 text-success small"
                  >Completed</span
                >
              </td>
            </tr>
            <tr>
              <td class="fw-medium small">#ORD-00919</td>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSpmqGJMudGRSUA1U-C_OKf7KmWnAgZJyFJSDKxVEFjS9yUEHs0VOJMjWrY47_YDQ08VHluFMJiqSX4WurFwGALwGu4csXmjsLHcWBeLYYdn8-ERJeI8e93q8XQWGltqiK5fglSRprcinK7-lQsr0YPWmG2D84JgESK1w0PeptMVSu1ciSWFGAJT3GfkLhUlH3Lfn8e-IuIqZsh96gvOcU7VlrjEsITIXJIWW_U6dedjnyHFh67ZKuxns_tzNCy2oXjjU_op-atovq"
                    class="rounded"
                    width="32"
                    height="32"
                    alt=""
                  />
                  <span class="small">Laundry Detergent</span>
                </div>
              </td>
              <td class="text-muted small">Oct 23</td>
              <td class="fw-bold small">150,000 ₫</td>
              <td>
                <span class="badge bg-warning bg-opacity-10 text-warning small"
                  >Pending</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// Không cần logic phức tạp cho trang tĩnh
</script>

<style scoped>
.card {
  transition: all 0.2s ease;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px -3px rgba(0, 0, 0, 0.1) !important;
}
</style>
