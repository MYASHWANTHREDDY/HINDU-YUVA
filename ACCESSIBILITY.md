# Accessibility & Performance Guidelines

## Image Alt Text Best Practices

All images on the Hindu YUVA website should have descriptive alt text. Here are examples:

### Events/Gallery Images
```jsx
<img 
  src={eventImage} 
  alt="Hindu YUVA members celebrating Holi festival with colored powder and traditional decorations" 
  className="w-full h-48 object-cover"
/>
```

### Logo Images
```jsx
<img 
  src={HinduYuvaLogo} 
  alt="Hindu YUVA at CSUF logo" 
  className="w-16 h-16 object-contain"
/>
```

### Background/Decorative Images
```jsx
<img 
  src={backgroundImage} 
  alt="" // Empty alt for purely decorative images
  className="w-full h-64 object-cover"
  aria-hidden="true"
/>
```

## Dark Mode Support

The website now includes a theme toggle in the navbar. Users can switch between light and dark modes. 

### Dark Mode Classes Added:
- `dark:bg-gray-900` - Dark background
- `dark:text-gray-100` - Dark text
- `dark:border-gray-700` - Dark borders
- `dark:hover:text-orange-400` - Dark mode hover states

## Performance Optimization Checklist

### Images
- [ ] Compress images before uploading (use tools like TinyPNG, ImageOptim)
- [ ] Use WebP format for better compression
- [ ] Add `loading="lazy"` attribute for images below the fold
- [ ] Set explicit width/height to prevent layout shift

### Code Splitting
- [ ] Components are code-split by route
- [ ] Large libraries imported only when needed

### Caching
- [ ] All assets have proper cache headers
- [ ] Service workers can be added for offline support

### Analytics
- [ ] Google Analytics configured (update GA ID in index.html)
- [ ] Track key events: page views, event registrations, form submissions

## Accessibility Features Implemented

✅ **Semantic HTML**
- Using proper heading hierarchy (h1, h2, h3)
- Using semantic elements (nav, main, footer, section)
- Proper button and link elements

✅ **ARIA Attributes**
- `aria-label` on buttons and icon buttons
- `aria-hidden="true"` on decorative elements
- `role` attributes where needed

✅ **Keyboard Navigation**
- All interactive elements are keyboard accessible
- Focus indicators visible on all interactive elements
- Tab order is logical

✅ **Color Contrast**
- Text meets WCAG AA standards (4.5:1 ratio for normal text)
- Orange (#ea580c) on white provides good contrast

✅ **Dark Mode**
- Proper contrast in dark mode
- Theme preference respects system settings
- User preference saved in localStorage

## Image Optimization Guidelines

When adding images to the website:

1. **For Events/Gallery:**
   - Size: 800x600px for landscape, 600x800px for portrait
   - Format: JPEG for photos, PNG for graphics
   - Compress: Use TinyPNG or similar tool

2. **For Icons/Logos:**
   - Size: SVG preferred, PNG as fallback
   - Maintain aspect ratio

3. **For Backgrounds:**
   - Size: 1920x1080px minimum
   - Compress heavily (80-85% quality)

## Future Improvements

- [ ] Add service worker for offline support
- [ ] Implement image lazy loading
- [ ] Add font optimization
- [ ] Setup performance monitoring with Web Vitals
- [ ] Add automated accessibility testing

## Testing

### Manual Testing
- Test with keyboard navigation only
- Test with screen readers (NVDA, JAWS, VoiceOver)
- Test in dark mode
- Test on mobile devices

### Tools
- Lighthouse (built into Chrome DevTools)
- WAVE (Web Accessibility Evaluation Tool)
- axe DevTools
- Lighthouse CI for automated testing

## Useful Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
