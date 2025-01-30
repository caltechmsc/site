/**
 * @class MapSelector
 * @description A class to handle the map selection modal.
 */
class MapSelector {
  /**
   * @constructor MapSelector
   * @param {HTMLElement} mapModal The map selection modal element.
   * @param {HTMLElement} mapElement The map element.
   */
  constructor(mapModal, mapElement) {
    this.ZOOM_LEVEL = 13;

    this.mapModal = mapModal;
    this.mapElement = mapElement;
    this.map = null;
    this.currentMarker = null;
    this.selectedLatLng = null;
  }

  openMapModal() {
    this.mapModal.style.display = 'block';
    this.initializeMap();
  }

  closeMapModal() {
    this.mapModal.style.display = 'none';
  }

  confirmLocation() {
    return new Promise((resolve, reject) => {
      if (this.selectedLatLng) {
        this.closeMapModal();
        resolve(this.selectedLatLng);
      } else {
        app.ui.alert('No location selected.', 'error');
        reject('No location selected.');
      }
    });
  }

  initializeMap() {
    if (!this.map) {
      this.map = L.map(this.mapElement).fitWorld();

      // Set up the OpenStreetMap layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Add click event listener to the map
      this.map.on('click', this.onMapClick.bind(this));

      // Set the map view to the user's current location with a larger zoom level
      this.map.locate({ setView: true, maxZoom: 13 });

      // Handle location error event
      this.map.on('locationerror', (e) => {
        app.ui.alert('Location access denied.', 'error');
      });

      // Add search control to the map
      L.Control.geocoder({
        defaultMarkGeocode: false,
      })
        .on('markgeocode', (e) => {
          const latLng = e.geocode.center;
          this.setMarker(latLng);
          this.map.setView(latLng, this.ZOOM_LEVEL);
        })
        .addTo(this.map);

      // If a marker was set before the map was initialized, set it now
      if (this.markerCache) {
        const MOVEMENT_DELAY = 500;
        setTimeout(() => {
          this.setMarker(this.markerCache.latLng, this.markerCache.zoom);
          this.markerCache = null;
        }, MOVEMENT_DELAY);
      }
    }
  }

  onMapClick(e) {
    const clickedLatLng = e.latlng;
    this.setMarker(clickedLatLng);
  }

  setMarker(latLng, zoom = false) {
    if (!this.map) {
      this.markerCache = { latLng, zoom };
      this.selectedLatLng = latLng;
      return;
    }

    // If a marker already exists, remove it
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }

    // Add a new marker at the clicked location
    this.currentMarker = L.marker(latLng).addTo(this.map);

    // Locate the map to the clicked location
    this.map.setView(latLng, zoom ? this.ZOOM_LEVEL : this.map.getZoom());

    // Store the selected coordinates
    this.selectedLatLng = latLng;
  }
}
