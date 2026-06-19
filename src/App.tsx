/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MobileAppLayout } from './screens/MobileAppLayout';
import { MobileLoginScreen } from './screens/MobileLoginScreen';

// This acts as the main entry point for the preview.
// Switching to MobileAppLayout to view the complete unified mobile application.
export default function App() {
  return <MobileAppLayout />;
}
