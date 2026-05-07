/* ============================================
   CAMPUSFIND - Application Core
   Lost & Found Item Recovery System
   ============================================ */

const CampusFindApp = (() => {
  // ---- Sample Data ----
  const sampleItems = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "electronics",
      status: "lost",
      date: "2026-04-28",
      location: "Library, 2nd Floor",
      description: "Space Black iPhone 15 Pro Max with a clear case and a small crack on the top left corner of the screen. Has a blue popsocket on the back.",
      contactName: "Rahul Sharma",
      contact: "rahul.sharma@campus.edu",
      image: "images/iphone_15_pro_max.jpg"
    },
    {
      id: 2,
      name: "Blue JanSport Backpack",
      category: "bags",
      status: "found",
      date: "2026-04-27",
      location: "Cafeteria, Near Counter 3",
      description: "Navy blue JanSport backpack with a keychain of a small teddy bear attached to the zipper. Contains textbooks and a pencil case inside.",
      contactName: "Priya Patel",
      contact: "priya.patel@campus.edu",
      image: "images/blue_jansport_backpack.jpg"
    },
    {
      id: 3,
      name: "Car Keys with Honda Fob",
      category: "keys",
      status: "found",
      date: "2026-04-26",
      location: "Parking Lot B",
      description: "Set of car keys with a Honda key fob, two house keys, and a small flashlight keychain. Found near the entrance of Parking Lot B.",
      contactName: "Amit Kumar",
      contact: "+91 98765 43210",
      image: "images/car_key.jpg"
    },
    {
      id: 4,
      name: "Black Leather Wallet",
      category: "accessories",
      status: "lost",
      date: "2026-04-25",
      location: "Seminar Hall, Block C",
      description: "Black leather bi-fold wallet, Woodland brand. Contains student ID card, Debit card, and some cash. Very important documents inside.",
      contactName: "Sneha Gupta",
      contact: "sneha.gupta@campus.edu",
      image: "images/black_leather_wallet.jpg"
    },
    {
      id: 5,
      name: "Samsung Galaxy Earbuds",
      category: "electronics",
      status: "recovered",
      date: "2026-04-22",
      location: "Computer Lab, Block A",
      description: "White Samsung Galaxy Buds2 Pro in their charging case. Found in the computer lab and returned to the owner successfully.",
      contactName: "Vikram Singh",
      contact: "vikram.singh@campus.edu",
      image: "images/samsung_galaxy_earbuds.jpg"
    },
    {
      id: 6,
      name: "Water Bottle - Hydro Flask",
      category: "bottles",
      status: "lost",
      date: "2026-04-24",
      location: "Gymnasium",
      description: "32 oz Pacific Blue Hydro Flask with stickers of mountain and sunset designs. Has a straw lid. Name 'Ananya' written on the bottom.",
      contactName: "Ananya Reddy",
      contact: "ananya.reddy@campus.edu",
      image: "images/water_bottle_hydro_flask.jpg"
    },
    {
      id: 7,
      name: "Student ID Card",
      category: "documents",
      status: "found",
      date: "2026-04-29",
      location: "Main Gate Entrance",
      description: "College student ID card found near the main gate. The card belongs to a Computer Science department student. Semester 6.",
      contactName: "Security Office",
      contact: "security@campus.edu",
      image: "images/student_college_id_card.jpg"
    },
    {
      id: 8,
      name: "Prescription Glasses",
      category: "accessories",
      status: "lost",
      date: "2026-04-23",
      location: "Lecture Hall 201, Block B",
      description: "Black rectangular frame prescription glasses in a brown leather case. Ray-Ban brand. Needed urgently for classes.",
      contactName: "Karthik Iyer",
      contact: "+91 87654 32109",
      image: "images/prescription_glasses.jpg"
    },
    {
      id: 9,
      name: "Denim Jacket",
      category: "clothing",
      status: "found",
      date: "2026-04-27",
      location: "Auditorium, Back Row",
      description: "Light blue denim jacket, Levi's brand, size M. Left behind after the cultural event. Has a small pin on the collar.",
      contactName: "Meera Nair",
      contact: "meera.nair@campus.edu",
      image: "images/denim_jacket.jpg"
    },
    {
      id: 10,
      name: "Scientific Calculator",
      category: "electronics",
      status: "lost",
      date: "2026-04-29",
      location: "Exam Hall 4",
      description: "Casio FX-991EX scientific calculator with name label 'Arjun M.' on the back. Was left after the mathematics exam.",
      contactName: "Arjun Mehta",
      contact: "arjun.m@campus.edu",
      image: "images/scientific_calculator.jpg"
    },
    {
      id: 11,
      name: "Laptop Charger - Dell",
      category: "electronics",
      status: "found",
      date: "2026-04-30",
      location: "Study Room 3, Library",
      description: "Dell 65W laptop charger with USB-C connector. Found plugged into a wall socket in Study Room 3 of the college library.",
      contactName: "Rohan Verma",
      contact: "rohan.v@campus.edu",
      image: "images/laptop_charger_dell.jpg"
    },
    {
      id: 12,
      name: "Umbrella - Black Foldable",
      category: "other",
      status: "recovered",
      date: "2026-04-20",
      location: "Bus Stop Near Campus",
      description: "Black foldable umbrella with wooden handle. Was found at the bus stop and successfully returned to its owner through this platform.",
      contactName: "Divya Joshi",
      contact: "divya.j@campus.edu",
      image: "images/umbrella_black.jpg"
    }
  ];

  // ---- State ----
  let items = [];
  let nextId = 100;
  const STORAGE_KEY = 'campusfind_items';

  // DOM cache
  const dom = {};

  // ---- Init ----
  function init() {
    cacheDom();
    loadItems();
    renderItems(items);
    setupNavbar();
    createParticles();
    animateStats();
    setupScrollAnimations();
    setDateDefaults();
    setupHeroSearch();
    updateStatsDisplay();
    setupGlobalListeners();
  }

  function cacheDom() {
    dom.navbar = document.getElementById('navbar');
    dom.navToggle = document.getElementById('navToggle');
    dom.navLinks = document.getElementById('navLinks');
    dom.particles = document.getElementById('particles');
    dom.itemsGrid = document.getElementById('itemsGrid');
    dom.noResults = document.getElementById('noResults');
    dom.searchInput = document.getElementById('searchInput');
    dom.statusFilter = document.getElementById('statusFilter');
    dom.categoryFilter = document.getElementById('categoryFilter');
    dom.sortFilter = document.getElementById('sortFilter');
    dom.heroSearch = document.getElementById('heroSearch');
    dom.toastContainer = document.getElementById('toastContainer');
  }

  // ---- LocalStorage ----
  function loadItems() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        items = JSON.parse(stored);
      } else {
        items = [...sampleItems];
        saveItems();
      }
    } catch (e) {
      console.warn('Error reading localStorage, falling back to sample data.', e);
      items = [...sampleItems];
    }

    const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
    nextId = maxId + 1;
  }

  function saveItems() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Error saving to localStorage.', e);
      showToast('Could not save data locally. Please clear some storage.', 'error');
    }
  }

  // ---- Navbar ----
  function setupNavbar() {
    if (!dom.navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        dom.navbar.classList.add('scrolled');
      } else {
        dom.navbar.classList.remove('scrolled');
      }
    });

    if (dom.navToggle && dom.navLinks) {
      dom.navToggle.addEventListener('click', () => {
        const isActive = dom.navLinks.classList.toggle('active');
        dom.navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      });

      dom.navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          dom.navLinks.classList.remove('active');
          dom.navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // ---- Particles ----
  function createParticles() {
    if (!dom.particles) return;
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
      particle.style.animationDelay = (Math.random() * 6) + 's';
      const size = (Math.random() * 3 + 1) + 'px';
      particle.style.width = size;
      particle.style.height = size;
      dom.particles.appendChild(particle);
    }
  }

  // ---- Stats Animation ----
  function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          animateCount(el, 0, target, 1500);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));
  }

  function animateCount(el, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (end - start) * eased);
      el.textContent = current.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // ---- Scroll Animations ----
  function setupScrollAnimations() {
    const elements = document.querySelectorAll('.stat-card, .step-card, .section-header');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  // ---- Render Items ----
  function renderItems(itemsToRender) {
    if (!dom.itemsGrid || !dom.noResults) return;

    if (!itemsToRender.length) {
      dom.itemsGrid.innerHTML = '';
      dom.noResults.style.display = 'block';
      return;
    }

    dom.noResults.style.display = 'none';

    dom.itemsGrid.innerHTML = itemsToRender.map((item, index) => {
      const statusClass = `status-${item.status}`;
      const statusLabel = item.status.charAt(0).toUpperCase() + item.status.slice(1);
      const statusIcon = item.status === 'lost' ? 'fa-exclamation-triangle' :
                         item.status === 'found' ? 'fa-hand-holding-heart' : 'fa-check-circle';
      const categoryIcons = {
        electronics: 'fa-laptop',
        accessories: 'fa-glasses',
        documents: 'fa-file-alt',
        clothing: 'fa-tshirt',
        bags: 'fa-shopping-bag',
        keys: 'fa-key',
        bottles: 'fa-wine-bottle',
        other: 'fa-box'
      };
      const catIcon = categoryIcons[item.category] || 'fa-box';
      const formattedDate = new Date(item.date).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
      });

      return `
        <div class="item-card" onclick="CampusFindApp.openDetail(${item.id})" style="animation-delay: ${index * 0.05}s">
          <div class="item-card-image">
            ${item.image
              ? `<img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy">`
              : `<i class="fas ${catIcon} placeholder-icon" aria-hidden="true"></i>`
            }
          </div>
          <span class="item-card-category"><i class="fas ${catIcon}"></i> ${item.category}</span>
          <div class="item-card-body">
            <span class="item-card-status ${statusClass}">
              <i class="fas ${statusIcon}"></i> ${statusLabel}
            </span>
            <h3 class="item-card-title">${escapeHtml(item.name)}</h3>
            <p class="item-card-desc">${escapeHtml(item.description)}</p>
            <div class="item-card-meta">
              <span><i class="fas fa-map-marker-alt"></i> ${escapeHtml(item.location)}</span>
              <span><i class="fas fa-calendar-alt"></i> ${formattedDate}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ---- Filter & Search ----
  function filterItems() {
    const query = dom.searchInput ? dom.searchInput.value.toLowerCase().trim() : '';
    const status = dom.statusFilter ? dom.statusFilter.value : 'all';
    const category = dom.categoryFilter ? dom.categoryFilter.value : 'all';
    const sort = dom.sortFilter ? dom.sortFilter.value : 'newest';

    let filtered = items.filter(item => {
      const matchSearch = !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchStatus = status === 'all' || item.status === status;
      const matchCategory = category === 'all' || item.category === category;

      return matchSearch && matchStatus && matchCategory;
    });

    if (sort === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    renderItems(filtered);
  }

  function setupHeroSearch() {
    if (!dom.heroSearch) return;
    dom.heroSearch.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchFromHero();
      }
    });
  }

  function searchFromHero() {
    if (!dom.heroSearch || !dom.searchInput) return;
    const query = dom.heroSearch.value.trim();
    if (!query) return;

    dom.searchInput.value = query;
    const itemsSection = document.getElementById('items');
    if (itemsSection) {
      itemsSection.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(filterItems, 400);
  }

  function quickSearch(term) {
    if (!dom.heroSearch) return;
    dom.heroSearch.value = term;
    searchFromHero();
  }

  // ---- Item Detail Modal ----
  function openDetail(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const statusClass = `status-${item.status}`;
    const statusLabel = item.status.charAt(0).toUpperCase() + item.status.slice(1);
    const statusIcon = item.status === 'lost' ? 'fa-exclamation-triangle' :
                       item.status === 'found' ? 'fa-hand-holding-heart' : 'fa-check-circle';
    const categoryIcons = {
      electronics: 'fa-laptop', accessories: 'fa-glasses', documents: 'fa-file-alt',
      clothing: 'fa-tshirt', bags: 'fa-shopping-bag', keys: 'fa-key',
      bottles: 'fa-wine-bottle', other: 'fa-box'
    };
    const catIcon = categoryIcons[item.category] || 'fa-box';
    const formattedDate = new Date(item.date).toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    const detailContent = document.getElementById('detailContent');
    if (!detailContent) return;

    const canMarkRecovered = item.status !== 'recovered';

    detailContent.innerHTML = `
      <div class="detail-header">
        <div class="detail-image">
          ${item.image
            ? `<img src="${item.image}" alt="${escapeHtml(item.name)}">`
            : `<i class="fas ${catIcon} placeholder-icon" aria-hidden="true"></i>`
          }
        </div>
        <div class="detail-info">
          <span class="item-card-status ${statusClass}" style="margin-bottom:12px;">
            <i class="fas ${statusIcon}"></i> ${statusLabel}
          </span>
          <h2 id="detailModalTitle">${escapeHtml(item.name)}</h2>
          <span class="item-card-category" style="position:static; margin-top:8px; display:inline-flex;">
            <i class="fas ${catIcon}"></i> ${item.category}
          </span>
        </div>
      </div>
      <div class="detail-meta-grid">
        <div class="detail-meta-item">
          <span class="label">Date</span>
          <span class="value">${formattedDate}</span>
        </div>
        <div class="detail-meta-item">
          <span class="label">Location</span>
          <span class="value">${escapeHtml(item.location)}</span>
        </div>
        <div class="detail-meta-item">
          <span class="label">Category</span>
          <span class="value" style="text-transform:capitalize">${item.category}</span>
        </div>
        <div class="detail-meta-item">
          <span class="label">Status</span>
          <span class="value" style="text-transform:capitalize">${item.status}</span>
        </div>
      </div>
      <div class="detail-description">
        <h3>Description</h3>
        <p>${escapeHtml(item.description)}</p>
      </div>
      <div class="detail-contact">
        <h3><i class="fas fa-address-book"></i> Contact Information</h3>
        <p><i class="fas fa-user"></i> ${escapeHtml(item.contactName)}</p>
        <p><i class="fas fa-envelope"></i> ${escapeHtml(item.contact)}</p>
      </div>
      <div class="detail-actions">
        ${canMarkRecovered ? `
          <button class="btn btn-primary-glow" onclick="CampusFindApp.markAsRecovered(${item.id})">
            <i class="fas fa-check-circle"></i> Mark as Recovered
          </button>
        ` : `
          <span class="detail-recovered-label">
            <i class="fas fa-check-circle"></i> Already marked as recovered
          </span>
        `}
      </div>
    `;

    openModal('itemDetailModal');
  }

  function markAsRecovered(id) {
    const item = items.find(i => i.id === id);
    if (!item || item.status === 'recovered') return;

    item.status = 'recovered';
    saveItems();
    filterItems();
    updateStatsDisplay();
    showToast(`"${item.name}" has been marked as recovered.`, 'success');
    openDetail(id);
  }

  // ---- Modal Controls ----
  let lastFocusedElement = null;

  function openModal(id) {
    const modalOverlay = document.getElementById(id);
    if (!modalOverlay) return;

    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    const firstFocusable = modalOverlay.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) firstFocusable.focus();
  }

  function closeModal(id) {
    const modalOverlay = document.getElementById(id);
    if (!modalOverlay) return;

    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';

    if (lastFocusedElement && lastFocusedElement.focus) {
      lastFocusedElement.focus();
    }
  }

  function setupGlobalListeners() {
    // Close modal on overlay click
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay') && e.target.classList.contains('active')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
          modal.classList.remove('active');
        });
        document.body.style.overflow = '';
      }
    });
  }

  // ---- Report Form Submit ----
  function submitReport(event, type) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const newItem = {
      id: nextId++,
      name: formData.get('itemName'),
      category: formData.get('category'),
      status: type,
      date: formData.get('date'),
      location: formData.get('location'),
      description: formData.get('description'),
      contactName: formData.get('contactName'),
      contact: formData.get('contact'),
      image: null
    };

    const imageInput = form.querySelector('input[type="file"]');
    if (imageInput && imageInput.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        newItem.image = e.target.result;
        addItem(newItem, type, form);
      };
      reader.readAsDataURL(imageInput.files[0]);
    } else {
      addItem(newItem, type, form);
    }
  }

  function addItem(newItem, type, form) {
    items.unshift(newItem);
    saveItems();

    const modalId = type === 'lost' ? 'reportLostModal' : 'reportFoundModal';
    closeModal(modalId);
    form.reset();

    const previewId = type === 'lost' ? 'lostImagePreview' : 'foundImagePreview';
    const previewEl = document.getElementById(previewId);
    if (previewEl) previewEl.innerHTML = '';

    filterItems();
    updateStatsDisplay();

    const label = type === 'lost' ? 'Lost' : 'Found';
    showToast(`${label} item "${newItem.name}" has been reported successfully!`, 'success');

    const itemsSection = document.getElementById('items');
    if (itemsSection) {
      setTimeout(() => {
        itemsSection.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }

  // ---- Image Preview ----
  function previewImage(input) {
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    const reader = new FileReader();
    const form = input.closest('form');
    if (!form) return;

    const previewId = form.id === 'lostForm' ? 'lostImagePreview' : 'foundImagePreview';
    const previewEl = document.getElementById(previewId);
    if (!previewEl) return;

    reader.onload = function (e) {
      previewEl.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);

    const uploadArea = input.closest('.file-upload');
    if (uploadArea) {
      const p = uploadArea.querySelector('p');
      if (p) p.textContent = file.name;
    }
  }

  // ---- Update Stats After New Item ----
  function updateStatsDisplay() {
    const totalReported = items.length;
    const totalRecovered = items.filter(i => i.status === 'recovered').length;
    const rate = totalReported > 0 ? Math.round((totalRecovered / totalReported) * 100) : 0;

    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 4) {
      const currentReported = parseInt(statNumbers[0].textContent.replace(/,/g, ''), 10) || 0;
      const currentRecovered = parseInt(statNumbers[1].textContent.replace(/,/g, ''), 10) || 0;
      const currentRate = parseInt(statNumbers[3].textContent.replace(/,/g, ''), 10) || 0;

      animateCount(statNumbers[0], currentReported, totalReported, 800);
      animateCount(statNumbers[1], currentRecovered, totalRecovered, 800);
      // statNumbers[2] is Active Users (simulated)
      animateCount(statNumbers[3], currentRate, rate, 800);
    }
  }

  // ---- Toast Notifications ----
  function showToast(message, type = 'info') {
    if (!dom.toastContainer) return;

    const icons = {
      success: 'fa-check-circle',
      error: 'fa-times-circle',
      info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas ${icons[type]} toast-icon" aria-hidden="true"></i>
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Dismiss notification" onclick="this.parentElement.remove()">&times;</button>
    `;

    dom.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ---- Set Date Defaults ----
  function setDateDefaults() {
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
      input.setAttribute('max', today);
      if (!input.value) {
        input.value = today;
      }
    });
  }

  // ---- Utility: Escape HTML ----
  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- Public API ----
  return {
    init,
    filterItems,
    openModal,
    closeModal,
    openDetail,
    searchFromHero,
    quickSearch,
    submitReport,
    previewImage,
    markAsRecovered
  };
})();

// ---- App Bootstrap ----
document.addEventListener('DOMContentLoaded', CampusFindApp.init);